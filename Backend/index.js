import express from "express";
import usersRouter from "./route/users.js";
import postsRouter from "./route/posts.js";
import commentsRouter from "./route/comment.js";
import cors from "cors";
import err from "./funs/not-found.js";
import { logger } from "./middleWares/logger.js";
import errorhandle from "./funs/error.js";
import "dotenv/config";
import MongodbConnecton from "./route/mongosh.js";

// const API_URL = process.env.API_URL;
const { USERS_API_URL, POSTS_API_URL, COMMENTS_API_URL } = process.env;
const port = process.env.PORT;

const app = express();
MongodbConnecton();

app.use(cors());

app.use(
  cors({
    // origin: ["https://mern-project-i2s18ud4f-movie-lands-projects.vercel.app"],
    origin: ["https://blog-zone-eight.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ Hello: "message" });
});

app.use(`/${USERS_API_URL}`, usersRouter);
app.use(`/${POSTS_API_URL}`, postsRouter);
app.use(`/${COMMENTS_API_URL}`, commentsRouter);

app.use(err);
app.use(errorhandle);

app.listen(port, () => {
  console.log(`server running on Port: ${port}`);
});

// "start": "nodemon --env-file=.env src/index.js index.js",
// "buildCommand": "next build"

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ugwucollins/Mern_Project.git
// git push -u origin main

// or

// git remote add origin git@github.com:ugwucollins/BlogZone.git
// git branch -M main
// git push -u origin main
