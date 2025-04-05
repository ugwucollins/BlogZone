import jwt from "jsonwebtoken";
import UserModels from "../../models/users.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

const { JSONKEY } = process.env;

export const themehandler = async (req, res) => {
  const { id } = req.params;
  const { theme } = req.body;
  console.log(theme);

  const userId = await UserModels.findById({ _id: id });
  const data = {
    theme: theme,
  };
  try {
    if (userId) {
      const updatedTheme = await UserModels.findByIdAndUpdate(
        { _id: id },
        data
      );
      const message = "User theme has been updated Succesfully";
      console.log(updatedTheme);
      return res
        .status(200)
        .json({ message: message, success: true, user: updatedTheme });
    } else {
      console.log("error");
    }
  } catch (error) {
    const message = "failed";
    res.status(200).json({ message: message, success: false });
  }
};
export const getHandler = async (req, res) => {
  try {
    const response = await UserModels.find({}).populate("followers");
    if (response.length === 0) {
      res.status(404).json({ message: "Users not Found and Empty Collection" });
    } else {
      const posts = { users: response };
      console.log(response);
      res.status(200).json(posts);
    }
  } catch (error) {
    const err = new Error("User not found");
    next(err);
  }
};

export const postHandlerSignUp = async (req, res, next) => {
  const { email, firstName, lastName, imageUrl, password } = req.body;

  try {
    const existingUser = await UserModels.findOne({ email: email });

    if (existingUser) {
      const message = "User Email already Exist";
      res.status(404).json({ message: message, success: false });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log({ hashedPassword: hashedPassword });
      const data = {
        password: hashedPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
      };

      const newUser = await UserModels.create(data);
      const users = await newUser.save();
      const message = "User Created Succesfully";
      console.log(message);
      res.status(201).json({ message: message, success: true, users: users });
    }
  } catch (error) {
    const err = "Error! Something went wrong.";
    console.log(err);
    res.status(501).json({ message: err, success: false });
  }
};

export const postHandlerLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModels.findOne({ email: email });

    if (!existingUser) {
      const message = "User Email Does not Exist, Please go and Sign Up";
      console.log({ message: message });
      return res.status(404).json({
        message: message,
        success: false,
      });
    } else {
      const hashedPassword = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (!hashedPassword) {
        const message = "incorrect Password, Please try again";

        return res.status(404).json({
          message: message,
          success: false,
        });
      } else {
        console.log({ hashedPassword: hashedPassword });
        const token = jwt.sign(
          {
            userId: existingUser._id,
            email: existingUser.email,
          },
          JSONKEY,
          {
            expiresIn: "1h",
          }
        );

        const message = "User Has Succesfully Login";

        const decodedToken = jwt.verify(token, JSONKEY);
        const user = await UserModels.findOne({ email: decodedToken.email });
        return res.status(200).json({
          message: message,
          success: true,
          user: user,
          token: token,
        });
      }
    }
  } catch (error) {
    const err = "Error! Something went wrong. login failed , please try again";

    console.log(err);
    res.status(201).json({
      message: err,
      success: false,
    });
    // next(err);
  }
};

export const verfiyHandlerToken = async (req, res, next) => {
  const { id } = req.params;
  // const token = req.header("Authorization");

  if (!id) return res.status(401).json({ error: "Access denied" });
  try {
    const user = await UserModels.findById({ _id: id });
    const message = "User has been Authorize";
    res.status(200).json({
      message: message,
      success: true,
      user: user,
    });
    console.log({ user: user });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }

  // if (!id) return res.status(401).json({ error: "Access denied" });
  // try {
  //   const user = await UserModels.findById({ _id: id });
  //   const message = "User has been Authorize";
  //   res.status(200).json({
  //     message: message,
  //     success: true,
  //     user: user,
  //   });
  //   console.log({ user: user });
  // } catch (error) {
  //   res.status(401).json({ error: "Invalid token" });
  // }
};

export const updateHandler = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const { email, firstName, lastName, imageUrl, password } = req.body;
  const userId = await UserModels.findById({ _id: id });
  const CheckkUserId = userId;
  try {
    if (!CheckkUserId) {
      const message = "User Id Not Found";
      console.log(message);
      console.log(userId);
      res.status(404).json({ message: message, success: false });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const updateDate = Date.now();

      const data = {
        password: hashedPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
        updatedDate: updateDate,
      };

      const updateUser = await UserModels.findByIdAndUpdate({ _id: id }, data);
      const message = "User deatils has been updated Succesfully";
      console.log(message);
      console.log(updateUser);
      res
        .status(200)
        .json({ message: message, success: true, users: updateUser });
    }
  } catch (error) {
    const err = "Error! Something went wrong.";
    console.log(error);
    res.status(501).json({ message: err, success: false });
  }
};

export const updateFollowersHandler = async (req, res, next) => {
  const { id } = req.params;
  const { userId, isFollow } = req.body;
  const data = {
    userId: userId,
    isFollow: isFollow,
  };
  try {
    const response = await UserModels.findById({ _id: id });

    if (!response.followers) {
      const updateLikes = await UserModels.findByIdAndUpdate(
        { _id: id },
        { followers: [] },
        { upsert: true, runValidators: true }
      );

      const result = await updateLikes.save();
      res.status(201).json({
        message: "User follower Not Updated",
        success: false,
        data: result,
      });
    }

    const updatePostLikes = await UserModels.findById({ _id: id });
    data.isFollow
      ? updatePostLikes.followers.push(data.userId)
      : updatePostLikes.followers.pop(data.userId);
    const result = await updatePostLikes.save();
    res.status(200).json({
      message: "User Has been followed",
      post: result,
      success: true,
    });
  } catch (error) {
    const err = new Error("User not found");
    next(err);
  }
};

export const deleteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await UserModels.findByIdAndDelete({ _id: id });
    const message = "User has been deleted Succesfully";
    console.log(message);
    console.log(deleteUser);
    res
      .status(200)
      .json({ message: message, success: true, users: deleteUser });
  } catch (error) {
    const err = "Error! Something went wrong.";
    console.log(error);
    res.status(501).json({ message: err, success: false });
  }
};

export const roleUpdateHandler = async (req, res) => {
  const { role, roleRequest, postRequest } = req.body;
  const { email } = req.params;
  const usersInfo = await UserModels.findOne({ email: email });
  const updateDate = Date.now();

  try {
    if (!usersInfo) {
      const message = "User email Does not Exist";
      res.status(404).json({ success: false, message: message });
    } else {
      const data = {
        role: role,
        roleRequest: roleRequest,
        postRequest: postRequest,
        updatedDate: updateDate,
      };

      const message = "User  has been Updated";
      const userRole = await UserModels.findOneAndUpdate(
        { email: email },
        data
      );

      res.status(200).json({ success: true, message: message, user: userRole });
    }
  } catch (error) {
    const message = "oops Users email Does not Exist";
    res.status(404).json({ success: false, message: message });
  }
};

// try {
//   if (!token) {
//     res.status(404).json({
//       success: false,
//       message: "Error!Token was not provided.",
//     });
//   } else {
//     const message = "Users token gotten";
//     // const decodedToken = jwt.verify(token, JSONKEY);
//     // const user = await UserModels.findById({ _id: decodedToken.userId });
//     // console.log(message);
//     // res.status(200).json({
//     //   success: true,
//     //   user: user,
//     //   message: message,
//     // });
//     const decodedToken = jwt.verify(token, JSONKEY);
//     console.log(decodedToken.email);

//     const user = await UserModels.findOne({ email: decodedToken.email });
//     res.status(200).json({
//       message: message,
//       success: true,
//       user: user,
//     });
//   }
// } catch (error) {
//   const err = "Error! Something went wrong. No token";
//   console.log(err);
//   res.status(501).json({ message: err });
//   // next(err);
// }
// };
// cookie-parser
