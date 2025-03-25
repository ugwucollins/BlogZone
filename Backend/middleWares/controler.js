// import userModels from "../route/mongosh.js";

// export const getHandler = async (req, res, next) => {
//   try {
//     const response = await userModels.find({});
//     if (response.length === 0) {
//       res.status(404).json({ message: "User not Found and Empty Collection" });
//     } else {
//       const posts = { users: response };
//       console.log(response);
//       res.status(200).json(posts);

//     }
//   } catch (error) {
//     const err = new Error("User not found");
//     next(err);
//   }
// };

// export const getIdHandler = async (req, res, next) => {
//   const id = { _id: req.params.id };
//   const idCheck = await userModels.findById(id);
//   try {
//     if (idCheck) {
//       const response = await userModels.findById(id);
//       const succsse = await userModels.findById(id);

//       const posts = response;

//       console.log(succsse);
//       res.json(posts);
//     } else {
//       console.log({ message: "User Id Not Found" });
//       res.status(404).json({ message: "User Id Not Found" });
//     }
//   } catch (error) {
//     const err = new Error("User Id was not found");
//     next(err);
//   }
// };

// export const postHandler = async (req, res, next) => {
//   try {
//     const { name, titles, body, dateTime } = req.body;

//     const now = Date.now();
//     const date = new Intl.DateTimeFormat("en-us", {
//       dateStyle: "full",
//     }).format(now);
//     const updatedDate = "";
//     const newPost = { name, titles, body, date, dateTime, updatedDate };

//     if (newPost.name === "") {
//       const err = new Error("User Name is required");
//       console.log(err);
//       next(err);
//     } else if (newPost.name.length <= 4) {
//       const err = new Error("User Name most be more than 5 characters");
//       console.log(err);
//       next(err);
//     } else if (newPost.titles === "") {
//       const err = new Error("Titles is requried");
//       console.log(err);
//       next(err);
//     } else if (newPost.titles.length <= 9) {
//       const err = new Error("Title most be more than 10 characters");
//       console.log(err);
//       next(err);
//     } else if (newPost.body === "") {
//       const err = new Error("Your Content Is Requried");
//       console.log(err);
//       next(err);
//     } else if (newPost.body.length <= 29) {
//       const err = new Error("User Name most be more than 30 characters");
//       console.log(err);
//       next(err);
//     } else {
//       const response = await userModels.insertMany([newPost]);

//       const posts = response;
//       console.log({ message: "User was Created" });
//       res.status(201).json(posts);
//     }
//   } catch (error) {
//     const err = new Error("Users post was not created");
//     next(err);
//   }
// };

// export const patchHandler = async (req, res, next) => {
//   const now = Date.now();
//   const updatedDate = new Intl.DateTimeFormat("en-us", {
//     dateStyle: "full",
//   }).format(now);

//   const id = { _id: req.params.id };
//   const { name, titles, body } = req.body;

//   try {
//     const response = await userModels.updateOne(id, {
//       name,
//       titles,
//       body,
//       updatedDate,
//     });
//     const posts = response;
//     res.json(posts);
//   } catch (error) {
//     const err = new Error("User Id was not updated");
//     next(err);
//   }
// };

// export const putHandler = async (req, res, next) => {
//   const now = Date.now();
//   const updatedDate = new Intl.DateTimeFormat("en-us", {
//     dateStyle: "full",
//   }).format(now);

//   const id = { _id: req.params.id };
//   const { name, titles, body } = req.body;

//   try {
//     const response = await userModels.updateOne(id, {
//       name,
//       titles,
//       body,
//       updatedDate,
//     });
//     const posts = response;
//     res.json(posts);
//   } catch (error) {
//     const err = new Error("User Id was not updated");
//     next(err);
//   }
// };

// export const deleteHandler = async (req, res, next) => {
//   const id = { _id: req.params.id };
//   try {
//     const idCheck = await userModels.findById(id);

//     if (idCheck) {
//       const response = await userModels.deleteOne(id);
//       const posts = response;
//       res.json(posts);
//     } else {
//       console.log({ message: "User Id Was not Found" });

//       res.status(404).json({ message: " User Id Was not Found" });
//     }
//   } catch (error) {
//     const err = new Error("User Id was not deleted");
//     next(err);
//   }
// };
