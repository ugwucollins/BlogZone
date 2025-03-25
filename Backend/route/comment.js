import { Router } from "express";
import {
  getHandler,
  commentHandler,
  getByIdHandler,
  deleteHandler,
} from "../middleWares/Controlers/comment.js";
const router = Router();

router
  .get("/", getHandler)
  .get("/:id", getByIdHandler)
  .post("/", commentHandler)
  .delete("/:id", deleteHandler);

export default router;
