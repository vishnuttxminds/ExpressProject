import express, {  Request, Response } from "express";

const adminBoard = (req: Request,
    res: Response,) => {
    res.status(200).send("Admin Content.");
  };

  export default adminBoard;