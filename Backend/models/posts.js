import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    postMessage: { type: String, require: true },
    content: { type: String, require: true },
    categorate: { type: String, require: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        require: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
    ],

    imageUrl: String,
  },
  { timestamps: true }
);

const postModels = mongoose.model("post", postSchema);
export default postModels;

//unique: true,

// {
//     imageUrl: "home.jpeg",
//     _id: "1",
//     categorate: "Nature and Habitals",
//     title: "Product Manager at TechFlow",
//     postMessage:
//       "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
//     createdDate: Date.now(),
//     updatedDate: "",
//     createdBy: {
//       _id: "",
//       imageUrl: "avater.jpg",
//       firstName: "Avater",
//       lastName: "Deo",
//       email: "avaterDeo@gmal.com",
//       createdDate: Date.now(),
//       updatedDate: "",
//     },
//   },
