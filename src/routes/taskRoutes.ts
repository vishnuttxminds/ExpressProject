import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const objArray = [
  { id: 1, name: "Jabbar" },
  { id: 2, name: "Vishwam" },
  { id: 3, name: "Jose" },
  { id: 4, name: "Abu Tahir" },
  { id: 5, name: "Mannadiyar" },
  { id: 6, name: "Kouravar" },
  { id: 7, name: "Chako maash" },
];
const actualSize = objArray.length;

function arrayInsertion(item: { id: number; name: string }) {
  const promise = new Promise<void>(function (resolve, reject) {
    objArray.push(item);
    if (objArray.length > actualSize) {
      resolve();
    } else {
      reject();
    }
  });
  return promise;
}

const calculationMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id, name } = req.body;
  
  if (!id || !name) {
    res.send(`Send id and name, Format : {"id" :"value","name" : "value"}`);
  } else {
    arrayInsertion({ id: id, name: name })
      .then(() => {
        next();
      })
      .catch(() => {
        console.log(" Some thing went worng ");
      });
  }
  next();
};

router.post(
  "/post-value",
  calculationMiddleWare,
  (req: Request, res: Response) => {    
    res.send("employees are listed");
  }
);

router.get("/get-values", (req: Request, res: Response) => {
  res.send(objArray);
});

router.delete("/delete", (req: Request, res: Response) => {
  res.send("employees are logout");
});

router.delete("/logout", (req: Request, res: Response) => {
  res.send("employees are logout");
});

export default router;
