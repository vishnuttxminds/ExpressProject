import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
import { db } from "../utils/db";
import { PrismaClient } from "@prisma/client";
const User = db.tokenUser;
const prisma = new PrismaClient();
interface DecodedToken {
    id: string; 
}


export const verifyToken = (req: Request,
    res: Response,
    next: NextFunction) => {
    const  token  = req.headers.authorization;
    const user_id = req.body.userId;
    console.log(user_id);
    const separated = separateTokenAndBearer(token);
    console.log(separated.token);
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(separated.token,config.secret,
              (err, decoded) => {
                console.log(err?.message);
                
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.params.userId = (decoded as DecodedToken).id;
                next();
              });
  };


  export const isAdmin = async (req: Request,
    res: Response,
    next: NextFunction) => {
        try {
            const user_id = req.body.userId;
            console.log(user_id);
            
            const user = await prisma.tokenUser.findUnique({
                where: {
                    id: req.body.userId,
                },
                // include: {
                //     email : true,
                // },
            });
    
            if (!user) {
                return res.status(404).send({
                    message: "User not found!"
                });
            }
    
            let isAdmin = false;
    
            if (isAdmin) {
                next();
            } else {
                return res.status(403).send({
                    message: "Require Admin Role!"
                });
            }
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: "Internal Server Error!"
            });
        } finally {
            await prisma.$disconnect();
        }






  };


  function separateTokenAndBearer(fullToken:  string | undefined): { token: string, bearer: string } {

    if (!fullToken) {
        throw new Error('Token is undefined');
    }
    const parts = fullToken.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        throw new Error('Invalid token format');
    }
    return {
        token: parts[1],
        bearer: parts[0]
    };
}