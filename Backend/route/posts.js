// import { Router } from "express";
// import {
//   getHandler,
//   postHandler,
//   getIdHandler,
//   patchHandler,
//   putHandler,
//   deleteHandler,
// } from "../middleWares/controler.js";

// const router = Router();

// router.route("/users").get(getHandler).post(postHandler);

// router
//   .route("/users/:id")
//   .get(getIdHandler)
//   .patch(patchHandler)
//   .put(putHandler)
//   .delete(deleteHandler);

// export default router;

import { Router } from "express";
import {
  getHandler,
  postHandler,
  getByIdHandler,
  updateHandler,
  deleteHandler,
} from "../middleWares/Controlers/post.js";
const router = Router();

router
  .get("/", getHandler)
  .get("/:id", getByIdHandler)
  .post("/", postHandler)
  .put("/:id", updateHandler)
  .patch("/:id", updateHandler)
  .delete("/:id", deleteHandler);

export default router;
