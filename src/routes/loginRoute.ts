import express, { Request, Response } from "express";
const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("employees are listed");
});

router.get("/logout", (req: Request, res: Response) => {
  res.send("employees are logout");
});

export default router;
