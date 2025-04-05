import { Router } from "express";
import {
  getHandler,
  postHandlerSignUp,
  postHandlerLogin,
  verfiyHandlerToken,
  updateHandler,
  roleUpdateHandler,
  themehandler,
  updateFollowersHandler,
  deleteHandler,
} from "../middleWares/Controlers/user.js";
// import MongodbConnecton from "./mongosh.js";

const router = Router();
// MongodbConnecton();

router
  .get("/", getHandler)
  .get("/verfiy/:id", verfiyHandlerToken)
  .post("/login", postHandlerLogin)
  .post("/signUp", postHandlerSignUp)
  .put("/:id", updateHandler)
  .put("/theme/:id", themehandler)
  .put("/follower/:id", updateFollowersHandler)
  .patch("/:id", updateHandler)
  .put("/role/:email", roleUpdateHandler)
  .patch("/role/:email", roleUpdateHandler)
  .delete("/:id", deleteHandler);

export default router;
