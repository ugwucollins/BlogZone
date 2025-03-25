import "dotenv/config";
import commentModels from "../../models/comment.js";

// const { JSONKEY } = process.env;

export const getHandler = async (req, res) => {
  try {
    const response = await commentModels.find().populate("commentedBy");
    if (response.length === 0) {
      res.status(404).json({ message: "NO Comment found" });
    } else {
      const comment = { comment: response };
      console.log(response);
      res.status(200).json(comment);
    }
  } catch (error) {
    const err = new Error("Comment not found");
    next(err);
  }
};

export const getByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await commentModels
      .findById({ _id: id })
      .populate("commentedBy");
    if (!response) {
      res.status(404).json({ message: "Comment id Not found" });
    } else {
      const commentId = { commentId: response };
      res.status(200).json(commentId);
    }
  } catch (error) {
    const err = new Error("comment not found");
    next(err);
  }
};
export const commentHandler = async (req, res, next) => {
  const { text, commentedBy, imageUrl } = req.body;

  try {
    const existingComment = await commentModels.findOne({ text: text });

    if (existingComment) {
      const message = "Comment already Exist";
      res.status(404).json({ message: message, success: false });
    } else {
      const data = {
        text: text,
        commentedBy: commentedBy,
        imageUrl: imageUrl,
      };
      console.log({ data: data });

      const newcomment = await commentModels.create(data);
      const comments = await newcomment.save();
      const message = "Comment Created Succesfully";
      console.log(message);
      res
        .status(201)
        .json({ message: message, success: true, comments: comments });
    }
  } catch (error) {
    const err = "Error! Something went wrong.";
    console.log(err);
    res.status(501).json({ message: err, success: false });
  }
};

export const deleteHandler = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deleteComment = await commentModels.findByIdAndDelete({ _id: id });
    if (deleteComment.length === 0) {
      res.status(404).json({ message: "Empty comment Collection" });
    } else {
      res.status(200).json(deleteComment);
    }
  } catch (error) {
    const err = new Error("Post not found");
    next(err);
  }
};
