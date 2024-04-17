import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import login from "./routes/loginRoute";
import task from "./routes/taskRoutes";
import { PrismaClient } from "@prisma/client";

import auth from '../src/api/auth/routes';
import {isAdmin, verifyToken} from './routes/authJwt'
import controller from './api/controllers/user.controller'


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/", task);
app.use("/auth", auth)
app.get("/api/test/admin",
  [verifyToken, isAdmin],
  controller
);


// async function main() {
//   // =========== insert===========
//   //  await prisma.users.create({
//   //   data: {
//   //     name: 'Alice',
//   //     email: 'alice@prisma.com',

//   //     posts: {
//   //       create: { title: 'Hello World' },
//   //     },
//   //     profile: {
//   //       create: { bio: 'I like turtles' },
//   //     },
//   //   },
//   // })

//   // =========== update ===========
//   // await prisma.users.update({
//   //   where: {
//   //     email: 'komban@mailinator.com',
//   //   },
//   //   data: {
//   //     name: 'Komban'
//   //   },
//   // });

//   // =========== update ===========
//   // await prisma.post.updateMany({
//   //   where: {
//   //     authorId: 10,
//   //   },
//   //   data: {
//   //     title: 'Ari Komban'
//   //   },
//   // });

//   // =========== delete ===========
//   // await prisma.user.delete({
//   //   where: {
//   //     email: 'john@gmail.com',
//   //   },
//   // });

//   // deleteUsersBasedOnCondition();

//   // =========== print table values ===========
//   // const allUsers = await prisma.users.findMany({
//   //   include: {
//   //     posts: true,
//   //     profile: true,
//   //   },
//   // });

//   // =========== print table values ===========
//   // const allUsers = await prisma.users.findMany();

//   // console.dir(allUsers);
//   // deleteUsersBasedOnCondition();

//   // =========== print table in prisma studio ===========
//   // npx prisma studio

//   // ====== CURD one to one ========
//   // createUserAndProfile();
//   // createUserAndPosts();
//   // updateUserProfile();
//   // deleteUserAndProfile(4);

//   // ====== CURD one to many ========
//   // insertData();
//   // updateData();
//   // deleteData(1);

//   // ====== CURD many to many ========
//   // insertMMData();
//   // updateMMData(4);
//   // deleteMMData(4);


//   // const postsWithCategories = await prisma.mMPost.findMany({
//   //   include: {
//   //     categories: 
      
//   //      {
//   //       include: {
//   //       category: true
//   //         //{
//   //         //   where: {
//   //         //     name: 'supervisor',
//   //         //   },
//   //         // }
//   //       }
//   //     }
//   //   }
//   // });


//   // const postsWithCategories = await prisma.mMPost.findMany({
//   //       where: {
//   //         category: {
//   //           name: 'Supervisor'
//   //         }
//   //   }
//   // });

//   const postsWithCategoriesOP = await prisma.mMPost.findMany({
//     where: {
//       categories:  {
//         some: {
//           category: 
//           {
//             name: 'Supervisor',
//           }
//         }
//       }
//     },
//     include: {
//       categories :{
//         where :{
//             category: {
//               name:'Supervisor'
//             }
//         },
//         include :{
//           category: true
//         }
//       }
//     }
//   });

//   const postsWithCategories = await prisma.mMPost.findMany({
//     where: {
//       categories:  {
//         some: {
//           category: {
//             name: 'Supervisor',
//           }
//         }
//       }
//     },
//     include: {
//       categories: {
//         where: {
//           category: {
//             name: 'Supervisor',
//           }
//         },
//         include: {
//           category: true
//         }
//       }
//     }
//   });
  

//   console.dir(JSON.stringify(postsWithCategoriesOP));
  
// }

// const deleteUsersBasedOnCondition = async () => {
//   try {
//     const deleteResult = await prisma.user.deleteMany({
//       where: {
//         name: {
//           startsWith: "r",
//         },
//       },
//     });

//     console.log(`${deleteResult.count} user(s) deleted.`);
//   } catch (error) {
//     console.error("Error deleting users:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const updateUserProfile = async () => {
  try {
    const newUser = await prisma.profile.update({
      where: {
        id: 3,
      },
      data: {
        userLastName: "Komban",
      },
    });

    console.log("New user created:", newUser);
  } catch (error) {
    console.error("Error creating user and profile:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const deleteUserAndProfile = async (userIdToDelete: number) => {
  try {
    const userToDelete = await prisma.userOne.findUnique({
      where: {
        id: userIdToDelete,
      },
    });

    if (!userToDelete) {
      console.error("User not found.");
      return;
    }
    if (userToDelete.id) {
      await prisma.profile.delete({
        where: {
          id: userToDelete.id,
        },
      });
    }

    await prisma.userOne.delete({
      where: {
        id: userIdToDelete,
      },
    });

    console.log("User profile details deleted successfully.");
  } catch (error) {
    console.error("Error deleting user and profile:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const createUserAndProfile = async () => {
  try {
    const newUser = await prisma.userOne.create({
      data: {
        userFirstName: "chako",
      },
    });
    const newProfile = await prisma.profile.create({
      data: {
        userId: newUser.id,
        userLastName: "Thoma",
      },
    });

    console.log("New user created:", newUser);
    console.log("New profile created:", newProfile);
  } catch (error) {
    console.error("Error creating user and profile:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const createUserAndPosts = async () => {
  try {
    const newUser = await prisma.userMany.create({
      data: {},
    });

    const newPosts = await prisma.post.createMany({
      data: [{ authorId: newUser.id }, { authorId: newUser.id }],
    });

    console.log("New user created:", newUser);
    console.log("New posts created:", newPosts);
  } catch (error) {
    console.error("Error creating user and posts:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// =========== one to many ================

const insertData = async () => {
  try {
    const newUser = await prisma.manyUser.create({
      data: {
        userName: "vaaliban.com",
      },
    });

    const newPost = await prisma.manyPost.create({
      data: {
        authorId: newUser.id,
      },
    });

    console.log("Data inserted successfully:", { newUser, newPost });
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
};

const updateData = async () => {
  try {
    const updateUser = await prisma.manyUser.update({
      where: {
        id: 1,
      },
      data: {
        userName: "Komban.com",
      },
    });

    console.log("Data update successfully:", { updateUser });
  } catch (error) {
    console.error("Error update data:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
};

const deleteData = async (userId: any) => {
    try {
      const userPosts = await prisma.manyPost.findMany({
        where: {
          authorId: userId
        }
      });
      await Promise.all(userPosts.map(post => prisma.manyPost.delete({
        where: {
          id: post.id
        }
      })));
  
      await prisma.manyUser.delete({
        where: {
          id: userId
        }
      });
      console.log('User and associated posts deleted successfully');
  } catch (error) {
    console.error("Error update data:", error);
  } finally {
    await prisma.$disconnect();
  }
};



async function insertMMData() {
  try {
    const newPost = await prisma.mMPost.create({
      data: {
        title: 'Indian news',
        categories: {
          create: [
            { category: { create: { name: 'Category A' }}, assignedBy: 'Admin' },
            { category: { create: { name: 'Category B' }}, assignedBy: 'Admin' }
          ]
        }
      },
      include: {
        categories: true
      }
    });
    console.log('New post inserted successfully:', newPost);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function updateMMData(idChange : any) {
  try {
    const updatedPost = await prisma.mMPost.update({
      where: { id: idChange }, 
      data: {
        title: 'Hospital'
      }
    });
    const updatedCategory = await prisma.mMCategory.update({
      where: { id: idChange }, 
      data: {
        name: 'Supervisor'
      }
    });

    console.log('Field updated successfully:', { updatedPost, updatedCategory });
  } catch (error) {
    console.error('Error updating field:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteMMData(idChange : any) {
  try {
    const postCategories = await prisma.mMCategoriesOnPosts.findMany({
      where: {
        postId: idChange
      }
    });

    // Delete all rows in CategoriesOnPosts associated with the post
    await Promise.all(postCategories.map(category => prisma.mMCategoriesOnPosts.delete({
      where: {
        postId_categoryId: {
          postId: category.postId,
          categoryId: category.categoryId
        }
      }
    })));

    // Now, delete the post
    await prisma.mMPost.delete({
      where: {
        id: idChange
      }
    });

    console.log('Post and associated rows deleted successfully');

  } catch (error) {
    console.error('Error delete field:', error);
  } finally {
    await prisma.$disconnect();
  }
}


// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
