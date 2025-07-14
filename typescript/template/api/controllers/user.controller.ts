import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  console.log("[GET] /api/users called");
  res.status(200).json({
    success: true,
    message: "Fetched users successfully",
    data: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  });
};
