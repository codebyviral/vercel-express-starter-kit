#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import dotenv from "dotenv";
import symbols from "log-symbols";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = process.cwd();

const MIN_NODE_VERSION = 16;
const log = console.log;

function checkNodeVersion(required = MIN_NODE_VERSION) {
  const current = process.versions.node.split(".");
  const major = parseInt(current[0]);

  if (major < required) {
    log(
      `${symbols.error} ${chalk.red(
        `Node.js ${required}+ required. You have ${process.versions.node}`
      )}`
    );
    process.exit(1);
  }
}

function checkFolderSafe(dest) {
  const files = fs.readdirSync(dest);
  if (files.length > 0) {
    const hasPkg = files.includes("package.json");
    log(
      `${symbols.warning} ${chalk.yellow("The current directory isn't empty.")}`
    );
    if (hasPkg) {
      log(
        `${symbols.error} ${chalk.red(
          "Detected an existing Node.js project. Aborting to prevent overwriting."
        )}`
      );
      process.exit(1);
    }
    log(
      `${symbols.info} ${chalk.yellow(
        "Some files may be overwritten if they exist in the template."
      )}`
    );
  }
}

function validateEnv(envPath) {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    log(
      `${symbols.warning} ${chalk.yellow(".env file is missing or malformed.")}`
    );
    return false;
  }

  const requiredVars = ["MONGODB_URI", "PORT"];
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    log(
      `${symbols.warning} ${chalk.yellow(
        "Missing environment variables:"
      )} ${missing.join(", ")}`
    );
    return false;
  }

  return true;
}

function copyTemplateFiles(templatePath) {
  const spinner = ora("Setting up your project...").start();

  try {
    fs.copySync(templatePath, targetDir, { overwrite: true });
    spinner.succeed(chalk.green("Project scaffolded successfully!"));
  } catch (err) {
    spinner.fail("Template copying failed.");
    console.error(err);
    process.exit(1);
  }
}

async function promptUserOptions() {
  const response = await prompts({
    type: "select",
    name: "language",
    message: "Which language would you like to use?",
    choices: [
      { title: "TypeScript", value: "typescript" },
      { title: "JavaScript", value: "javascript" },
    ],
    initial: 0,
  });

  return response.language;
}

async function promptForPackageMetadata() {
  const responses = await prompts([
    {
      type: "text",
      name: "name",
      message: "App name:",
      initial: "",
    },
    {
      type: "text",
      name: "version",
      message: "Version:",
      initial: "1.0.0",
    },
    {
      type: "text",
      name: "description",
      message: "Description:",
      initial: "",
    },
    {
      type: "text",
      name: "keywords",
      message: "Keywords (comma-separated):",
      initial: "",
    },
    {
      type: "text",
      name: "author",
      message: "Author:",
      initial: "",
    },
  ]);

  return {
    ...responses,
    keywords: responses.keywords
      ? responses.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : undefined,
  };
}

async function updatePackageJson(metadata) {
  const pkgPath = path.join(targetDir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    log(
      `${symbols.warning} ${chalk.yellow("No package.json found to update.")}`
    );
    return;
  }

  try {
    const pkg = fs.readJsonSync(pkgPath);

    if (metadata.name) pkg.name = metadata.name;
    if (metadata.version) pkg.version = metadata.version;
    if (metadata.description) pkg.description = metadata.description;
    if (metadata.keywords) pkg.keywords = metadata.keywords;
    if (metadata.author) pkg.author = metadata.author;

    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
  } catch (err) {
    log(`${symbols.error} ${chalk.red("Failed to update package.json.")}`);
    console.error(err);
  }
}

async function main() {
  log(chalk.bold.cyan("\n🚀 create-vercel-express-mongodb-app"));
  log(
    chalk.gray(
      "Bootstrapping a modern Express + MongoDB app with Vercel-ready config...\n"
    )
  );

  checkNodeVersion();
  checkFolderSafe(targetDir);

  const languageChoice = await promptUserOptions();
  const metadata = await promptForPackageMetadata();

  const templatePath =
    languageChoice === "typescript"
      ? path.join(__dirname, "typescript", "template")
      : path.join(__dirname, "template");

  copyTemplateFiles(templatePath);
  await updatePackageJson(metadata);

  const envPath = path.join(targetDir, ".env");
  const isEnvValid = validateEnv(envPath);

  if (!isEnvValid) {
    log(
      `${symbols.info} ${chalk.yellow(
        "Update your .env file with valid MongoDB URI and PORT before starting the server."
      )}`
    );
  } else {
    log(`${symbols.success} ${chalk.green(".env validation complete.")}`);
  }

  log(`\n${symbols.success} ${chalk.green("You're all set! 🚀")}`);
  log(chalk.gray("\nNext Steps:"));
  log(chalk.cyan("  1. npm install"));
  log(chalk.cyan("  2. npm run dev"));
  log(chalk.gray("\nHappy coding! ✨\n"));
}

main().catch((err) => {
  log(`${symbols.error} ${chalk.red("Unexpected error during setup:")}`);
  console.error(err);
  process.exit(1);
});
