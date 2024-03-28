import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile("./html/view.html", { root: __dirname });
});

app.post("/profile", (req: Request, res: Response) => {
    const firstValue = req.body.myBio.first;
    res.send(`Response -  value received: ${firstValue}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
