import express, { Request, Response, NextFunction } from "express";

import {
  arrayInsertion,
  getAllList,
  deleteFromArray,
  updateIteamOfArray
} from "../module/arrayCalcuatios";

import {validateUserInput , userValidationRules} from '../utils/validator';

const router = express.Router();

const insertMiddleWare = (
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

const deleteMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const  {id}  = req.body;
  if (!id) {
    res.send(`Please send a id from the employee list`);
  } else {
    deleteFromArray(id)
      .then(() => {
        const empList = getAllList();
        res.send(empList)
        next();
      })
      .catch((error) => {
        console.log(error);
        res.send(error)
      });
  }
};

const updateMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id, name } = req.body;



  // if (!id || !name) {
  //   res.send(`Send existing id and updating name, Format : {"id" :"value","name" : "value"}`);
  // } else {
  //   updateIteamOfArray({ id: id, name: name })
  //     .then(() => {
  //       const empList = getAllList();
  //       res.send(empList)
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.send(error)
  //     });
  // }

  next()
};

router.post(
  "/post-value",
  insertMiddleWare,
  (req: Request, res: Response) => {
    res.send("employees are listed");
  }
);

router.get("/get-values", (req: Request, res: Response) => {
  const empList = getAllList();
  res.send(empList);
});


router.delete("/delete", deleteMiddleWare, (req: Request, res: Response) => {
  res.send("One item has been removed");
});

router.post("/update", userValidationRules() ,validateUserInput, updateMiddleWare, (req: Request, res: Response) => {
  res.send("Update has been done");
});

export default router;
