import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import login from "./routes/loginRoute";
import task from "./routes/taskRoutes";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/", task);

const prisma = new PrismaClient();

async function main() {
  // =========== insert===========

  //  await prisma.users.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.com',

  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // })

  // =========== update ===========
  // await prisma.users.update({
  //   where: {
  //     email: 'komban@mailinator.com',
  //   },
  //   data: {
  //     name: 'Komban'
  //   },
  // });

  // =========== update ===========
  // await prisma.post.updateMany({
  //   where: {
  //     authorId: 10,
  //   },
  //   data: {
  //     title: 'Ari Komban'
  //   },
  // });

  // =========== delete ===========
  // await prisma.user.delete({
  //   where: {
  //     email: 'john@gmail.com',
  //   },
  // });

  // deleteUsersBasedOnCondition();

  // =========== print table values ===========
  const allUsers = await prisma.users.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  // =========== print table values ===========
  // const allUsers = await prisma.users.findMany();

  console.dir(allUsers);
  // deleteUsersBasedOnCondition();

  // =========== print table in prisma studio ===========
  // npx prisma studio
}

const deleteUsersBasedOnCondition = async () => {
  try {
    const deleteResult = await prisma.user.deleteMany({
      where: {
        name: {
          startsWith: "r",
        },
      },
    });

    console.log(`${deleteResult.count} user(s) deleted.`);
  } catch (error) {
    console.error("Error deleting users:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// =========== middleware on express ===========

// const loggerMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   console.log(">>", `${req.method} ${req.path}`);
//   next();
// };

// const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const { username, password } = req.body;
//   if (username === "thomatt" && password === "password") {
//     next()
//   } else {
//     res.send("Auth error");
//   }
//   next();
// };
// app.use(loggerMiddleware);

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile("./html/view.html", { root: __dirname });
// });

// app.post("/profile", (req: Request, res: Response) => {
//   const firstValue = req.body.myBio.first;
//   res.send(`Response -  value received: ${firstValue}`);
// });

// app.post("/login", authMiddleware, (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   res.status(200).json({ message: "Login successful" })

//   // const username = req.body.username;
//   // const password = req.body.password;

//   // console.log("username > ", username);
//   // console.log("password > ", password);

//   // if (!username || !password) {
//   //   return res
//   //     .status(400)
//   //     .json({ error: "Username and password are required." });
//   // }

//   // if (username === "thomatt" && password === "password") {
//   //   // If valid, send success response
//   //   return res.status(200).json({ message: "Login successful" });
//   // } else {
//   //   // If invalid, send error response
//   //   return res.status(401).json({ error: "Invalid username or password" });
//   // }
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
