import "dotenv/config";
import postModels from "../../models/posts.js";

export const getHandler = async (req, res, next) => {
  try {
    const AllPost = await postModels
      .find({})
      // .populate("createdBy", "firstName lastName email followers imageUrl")
      .populate({
        path: "createdBy",
        populate: {
          path: "followers",
          model: "user",
        },
      })
      .populate({
        path: "comment",
        populate: {
          path: "commentedBy",
          model: "user",
        },
      })
      .populate("likes", "_id firstName lastName email followers imageUrl.url");
    if (AllPost.length === 0) {
      return res.status(404).json({ message: "Empty Post Collection" });
    }
    const posts = { posts: AllPost };
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    const err = new Error("Post not found, Server Error");
    next(err);
  }
};

export const getByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await postModels
      .findById({ _id: id })
      .populate("createdBy")
      .populate({
        path: "comment",
        populate: {
          path: "commentedBy",
          model: "user",
        },
      })
      .populate("likes", "_id firstName lastName email followers imageUrl.url");

    if (!response) {
      res.status(404).json({ message: "Post id Not found" });
    } else {
      const postsid = { postsid: response };
      res.status(200).json(postsid);
    }
  } catch (error) {
    const err = new Error("Post not found");
    next(err);
  }
};

export const postHandler = async (req, res, next) => {
  const { title, postMessage, categorate, createdBy, imageUrl, content } =
    req.body;

  try {
    const existingPost = await postModels.findOne({ title: title });

    if (existingPost) {
      const message = "Post already Exist";
      res.status(404).json({ message: message, success: false });
    } else {
      const data = {
        title: title,
        postMessage: postMessage,
        categorate: categorate,
        createdBy: createdBy,
        content: content,
        imageUrl: imageUrl,
      };
      console.log({ data: data });

      const newPost = await postModels.create(data);
      const posts = await newPost.save();
      const message = "Post Created Succesfully";
      console.log(message);
      res.status(201).json({ message: message, success: true, posts: posts });
    }
  } catch (error) {
    const err = "Error! Something went wrong.";
    console.log(err);
    res.status(501).json({ message: err, success: false });
  }
};

export const updateHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, postMessage, categorate, imageUrl, content } = req.body;
  const updatedDate = Date.now();

  const data = {
    title: title,
    postMessage: postMessage,
    categorate: categorate,
    content: content,
    imageUrl: imageUrl,
    updatedDate: updatedDate,
  };
  try {
    const response = await postModels.findById({ _id: id });

    if (!response) {
      res.status(404).json({ message: "Post id Not found", success: false });
    } else {
      const update = await postModels.findByIdAndUpdate({ _id: id }, data);
      console.log(update);

      res.status(200).json({
        message: "Post Has been Updated",
        post: update,
        success: true,
      });
    }
  } catch (error) {
    const err = new Error("Post not found");
    next(err);
  }
};
export const updatelikesHandler = async (req, res, next) => {
  const { id } = req.params;
  const { userId, islike } = req.body;
  const data = {
    userId: userId,
    islike: islike,
  };
  try {
    const response = await postModels
      .findById({ _id: id })
      .populate("createdBy", "firstName lastName email followers imageUrl")
      .populate({
        path: "comment",
        populate: {
          path: "commentedBy",
          model: "user",
        },
      })
      .populate("likes", "_id firstName lastName email followers imageUrl.url");

    if (!response.likes) {
      const updatelike = await postModels.findByIdAndUpdate(
        { _id: id },
        { likes: [] },
        { upsert: true, runValidators: true }
      );

      const result = await updatelike.save();
      return res.status(201).json({
        message: "Post like Not Updated",
        success: false,
        data: result,
      });
    }

    data.islike
      ? response.likes.push(data.userId)
      : response.likes.pop(data.userId);
    const result = await response.save();
    console.log(result);

    return res.status(200).json({
      message: "Post Has been Liked",
      post: response,
      success: true,
    });
  } catch (error) {
    const err = new Error("Post not found");
    next(err);
  }
};

export const deleteHandler = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deleteposts = await postModels.findByIdAndDelete({ _id: id });
    if (deleteposts.length === 0) {
      res.status(404).json({ message: "Empty Post Collection" });
    } else {
      res.status(200).json(deleteposts);
    }
  } catch (error) {
    const err = new Error("Post not found");
    next(err);
  }
};
