# Vercel Express + MongoDB Starter Kit

A minimal starter kit for creating an Express backend application with MongoDB, specifically designed for **serverless deployment on Vercel**.

This package generates the folder structure and configuration needed to run an Express server on Vercel’s serverless platform — effectively bridging the gap between traditional Node.js servers and modern serverless architecture.

Perfect for:
- Full backend applications ready to deploy  
- Quickly building and testing ideas  
- Projects that can go live with minimal setup

Easily extendable for larger production-grade applications with minimal adjustments.

---

## 🚀 Getting Started

### Create a New Project

Use the CLI to create a new project:

```bash
npx create-vercel-mongodb-app
```

Navigate Into Your Project

```bash 
cd my-app
```

Set Up Environment Variables

Open the generated .env file and replace the MongoDB URI placeholder with your actual connection string:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=7000
```

 Install Dependencies
```bash
npm install
```

 Run the Development Server

 ```bash
 npm run dev 
 ```

The server will run at http://localhost:7000 or as defined in your .env.

 ### 🧾 Project Structure

 ```pgsql
 your-app/
├── api/                  # Vercel serverless function entry point
│   └── index.js
├── src/
│   ├── app.js            # Express app setup
│   ├── db/               # MongoDB connection
│   │   └── connect.js
│   └── routes/           # Route handlers
│       └── example.router.js
├── .env
├── vercel.json
└── package.json
```

### 📦 Deploy to Vercel

1. Push your code to GitHub.

2. Go to vercel.com, import the project from GitHub.

3. Set the environment variable MONGODB_URI in Vercel’s dashboard.

4. Deploy.

5. That’s it — your Express + MongoDB server is now serverless and live! 
### Acknowledgements

- [Express.js](https://expressjs.com/) – Fast, unopinionated web framework for Node.js  
- [MongoDB](https://www.mongodb.com/) – NoSQL database for modern applications  
- [Vercel](https://vercel.com/) – Serverless platform for frontend and backend deployment  
- [dotenv](https://github.com/motdotla/dotenv) – Loads environment variables from `.env`  
- [Node.js](https://nodejs.org/) – JavaScript runtime built on Chrome's V8 engine

## Authors

- [@codebyviral](https://www.github.com/codebyviral)


# vercel-express-starter-kit
