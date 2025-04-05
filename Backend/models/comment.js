import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, require: true, trim: true },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      require: true,
    },
    imageUrl: String,
  },
  { timestamps: true }
);

const commentModels = mongoose.model("comment", commentSchema);
export default commentModels;
