import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, minLength: 3, require: true },
    lastName: { type: String, minLength: 3, require: true },
    email: { type: String, unique: true, trim: true, require: true },
    password: {
      type: String,
      min: [4, "Password must be more than 4 charatcers"],
      require: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "bloggers"],
      default: "user",
    },
    theme: { type: Boolean, default: false },
    postRequest: { type: Boolean, default: false, require: true },
    roleRequest: { type: Boolean, default: false, require: true },
    imageUrl: String,
    imageUrl: {
      type: Object,
      default: {
        file: {},
      },
    },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserModels = mongoose.model("user", userSchema);
export default UserModels;
