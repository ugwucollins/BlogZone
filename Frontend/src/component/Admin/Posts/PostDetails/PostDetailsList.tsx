import { useEffect, useState } from "react";

import moment from "moment";
import { HeartIcon, ImagesIcon, PlusIcon, SendIcon } from "lucide-react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { Post } from "../../../../content/Types";
import { notAuth, UserAuth } from "../../../../content/usersContext";
import { usePost } from "../../../Posts/postsContext";
import Api from "../../../../Axios/Api";
import { Button } from "../../../../data/Button";
import { motion } from "framer-motion";
import { CardsVartiant } from "../../../ui/apple-cards-carousel";
import { IconHeartFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";

const PostDetailsList = ({
  id,
  Likes,
  followers,
}: {
  id: string | any;
  Likes: any;
  followers: any;
}) => {
  const { posts }: any = usePost();

  const _id = localStorage.getItem("postId");
  const location = useLocation();
  const eachPost = posts.find((post: any) => post._id === _id && _id);
  const [eachUserPost, seteachUserPost] = useState<Post | any>(eachPost);
  const [imageUrl, setimageUrl] = useState({ file: null, url: "" });
  const [text, settext] = useState("");
  const { user }: any = UserAuth();

  localStorage.setItem("postId", id);

  const onchangeImage = (e: any) => {
    const values = e.target.files[0];
    setimageUrl({
      file: values,
      url: URL.createObjectURL(values),
    });
  };

  const fetchPostId = async () => {
    try {
      const res = await Api.get(`/posts/${_id}`);
      const data = res.data;
      seteachUserPost(data.postsid);
    } catch (error: any) {
      console.log(error);
      // toast.error("opps! something went wrong, Try again later");
    }
  };
  const LikePostHandler = async (push: boolean) => {
    const data = {
      userId: user._id,
      islike: push,
    };

    try {
      const res = await Api.put(`/posts/like/${_id}`, data);
      const isLike = res.data;
      if (isLike.success) {
        toast.success(isLike.message);
      } else {
        toast.warning(isLike.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("opps! something went wrong, Try again later");
    }
  };

  const saveComment = async () => {
    setimageUrl({
      file: null,
      url: "",
    });
    settext("");
    const datas = {
      text: text,
      commentedBy: user._id,
      imageUrl: imageUrl.url,
      PostId: id,
    };
    try {
      const res = await Api.post(`/comments`, datas);
      const data = res.data;
      console.log(data);

      if (data.success) {
        toast.success(data.message);
      }
      fetchPostId();
      // setcomment(data.comments);
      seteachUserPost(data.postsid);
    } catch (error: any) {
      console.log(error.response);

      // toast.error("opps! something went wrong, Try again later");
    }
  };
  const FollowUserHandler = async (push: boolean) => {
    const data = {
      userId: user._id,
      isFollow: push,
    };
    try {
      const res = await Api.put(
        `/users/follower/${eachUserPost && eachUserPost.createdBy._id}`,
        data
      );
      const isLike = res.data;
      fetchPostId();
      if (isLike.success) {
        toast.success(isLike.message);
      } else {
        toast.error(isLike.message);
      }
      seteachUserPost(eachPost);
    } catch (error: any) {
      console.log(error);
      toast.error("opps! something went wrong, Try again later");
    }
  };

  useEffect(() => {
    fetchPostId();
    seteachUserPost(eachPost);
  }, [eachPost, eachUserPost, Likes, posts, followers]);

  const [active, setactive] = useState(false);

  return (
    <div className="w-full relative my-4 min-h-screen">
      <div className="flex justify-center flex-col">
        <div className="w-full flex flex-row max-[680px]:flex-col max-[680px]:gap-5 py-2 px-1 pb-3 ">
          <div className="w-full max-[800px]:w-[55%] min-h-screen max-[680px]:p-2 max-[680px]:w-full">
            <h1 className="mt-3 text-[min(4rem,21px)] font-medium mb-2 text-black dark:text-white/80 text-wrap">
              {eachUserPost && eachUserPost.title}
            </h1>

            <motion.img
              initial={{
                scale: 0.1,
                y: -50,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.2,
                delay: 0.1,
                stiffness: 10,
              }}
              src={`${eachUserPost && eachUserPost.imageUrl}`}
              alt={eachUserPost && eachUserPost.title}
              className="w-full lg:h-[60vh] h-[50vh] rounded"
            />
            <p className="text-neutral-500 text-lg font-medium mb-1">
              {moment(eachUserPost && eachUserPost.createdDate).format(
                "Do MMM YYYY, h:mm a"
              )}
            </p>
            <p className="text-2xl font-medium text-black/70 capitalize dark:text-white/70 mb-1">
              {eachUserPost && eachUserPost.categorate}
            </p>
            <p className="dark:text-white/75 items-center text-black flex flex-row flex-wrap">
              {active
                ? eachUserPost && eachUserPost.postMessage
                : eachUserPost && eachUserPost.postMessage.length >= 120
                ? Array.from(
                    eachUserPost &&
                      eachUserPost.postMessage.slice(0, 1000) + " " + "..."
                  ).map((text: any, index: any) => (
                    <motion.h1
                      variants={CardsVartiant(index, 0.01)}
                      whileInView={"show"}
                      initial="hidden"
                      viewport={{ once: false, amount: 0.1 }}
                    >
                      {text === " " ? `\u00A0` : text}
                    </motion.h1>
                  ))
                : eachUserPost && eachUserPost.postMessage}
            </p>
            <div className="w-full flex item-center justify-between flex-row flex-wrap gap-2">
              {Likes ? (
                <div className="cursor-pointer flex gap-2 flex-row-reverse ml-1 items-center font-bold">
                  <p className="font-bold flex gap-2 flex-row items-center">
                    <span className="font-bold  dark:text-white">
                      {eachUserPost && eachUserPost.likes.length}{" "}
                    </span>
                    {eachUserPost && eachUserPost.likes.length <= 1
                      ? "Like"
                      : "Likes"}
                  </p>
                  <IconHeartFilled
                    color="red"
                    className=" cursor-pointer"
                    onClick={() => LikePostHandler(false)}
                  />
                </div>
              ) : (
                <div className="cursor-pointer flex gap-2 flex-row-reverse ml-1 items-center dark:text-white font-bold">
                  <p className="font-bold flex gap-2 flex-row items-center">
                    <span className="font-bold">
                      {eachUserPost && eachUserPost.likes.length}{" "}
                    </span>
                    {eachUserPost && eachUserPost.likes.length <= 1
                      ? "Like"
                      : "Likes"}
                  </p>
                  <HeartIcon onClick={() => LikePostHandler(true)} />
                </div>
              )}

              {/* {!CheckPostLike(eachUserPost && eachUserPost?.likes) ? (
                <div className="cursor-pointer flex gap-2 flex-row-reverse ml-1 items-center dark:text-white font-bold">
                  <p className="font-bold flex gap-2 flex-row items-center">
                    <span className="font-bold">
                      {eachUserPost && eachUserPost.likes.length}{" "}
                    </span>
                    {eachUserPost && eachUserPost.likes.length <= 1
                      ? "Like"
                      : "Likes"}
                  </p>
                  <HeartIcon onClick={() => LikePostHandler(true)} />
                </div>
              ) : (
                <div className="cursor-pointer flex gap-2 flex-row-reverse ml-1 items-center font-bold">
                  <p className="font-bold flex gap-2 flex-row items-center">
                    <span className="font-bold  dark:text-white">
                      {eachUserPost && eachUserPost.likes.length}{" "}
                    </span>
                    {eachUserPost && eachUserPost.likes.length <= 1
                      ? "Like"
                      : "Likes"}
                  </p>
                  <IconHeartFilled
                    color="red"
                    className=" cursor-pointer"
                    onClick={() => LikePostHandler(false)}
                  />
                </div>
              )} */}

              <div className="mr-1 ">
                <button
                  onClick={() => setactive(!active)}
                  className=" dark:text-black bg-black text-white font-semibold dark:bg-slate-200 px-3 hover:font-bold hover:bg-slate-300 hover:text-black/70 mr-2 dark:hover:bg-slate-500 dark:hover:text-white/90 py-2 rounded-3xl"
                >
                  {active ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>

          <div className="max-[680px]:w-full max-[680px]:mt-5 border rounded-lg drop-shadow w-1/2 lg:w-1/2 min-h-screen mx-1">
            <div className="ml-4">
              <div className="flex items-center flex-row flex-wrap justify-between mr-2">
                <div className="flex items-center mt-5  mb-2 gap-2">
                  <img
                    src={`${
                      (eachUserPost && eachUserPost.createdBy.imageUrl.url) ||
                      eachUserPost.createdBy.imageUrl.secure_url
                    }`}
                    alt={eachUserPost && eachUserPost.createdBy.lastName}
                    className="size-14 rounded-full"
                  />
                  <h1 className="font-medium text-black dark:text-white/90">
                    {eachUserPost &&
                      eachUserPost.createdBy.firstName +
                        " " +
                        eachUserPost.createdBy.lastName}
                  </h1>
                </div>
                <h1 className="text-gray-800/90 dark:text-gray-300/95 font-medium flex flex-row items-center flex-wrap">
                  <span className="font-bold">
                    {eachUserPost.createdBy &&
                      eachUserPost.createdBy.followers.length}{" "}
                    &nbsp;
                  </span>
                  {eachUserPost.createdBy &&
                  eachUserPost.createdBy.followers.length <= 1
                    ? "follower"
                    : "followers"}
                </h1>
              </div>
              {user ? (
                <>
                  {followers ? (
                    <Button
                      onClick={() => {
                        FollowUserHandler(false);
                      }}
                      title="Following"
                      className="dark:text-white"
                      Icon={<PlusIcon />}
                    />
                  ) : (
                    <Button
                      onClick={() => {
                        FollowUserHandler(true);
                      }}
                      title="Follow"
                      className="dark:text-white"
                      Icon={<PlusIcon />}
                    />
                  )}
                </>
              ) : (
                <>
                  <Button
                    onClick={() => notAuth(location)}
                    title="Follow"
                    className="dark:text-white"
                    Icon={<PlusIcon />}
                  />
                </>
              )}
              {/* <p className="mt-1 mb-2 text-black dark:text-white/80 capitalize">
                {eachUserPost && eachUserPost.categorate}
              </p> */}

              <div className="drop-shadow-lg dark:text-black right-1 mt-3 py-3 px-2 h-auto rounded-md mr-1 bg-slate-50">
                {imageUrl && (
                  <img
                    src={imageUrl && imageUrl.url}
                    className={clsx(
                      imageUrl.url
                        ? "w-full h-full mb-1 max-h-[290px]"
                        : "hidden"
                    )}
                  />
                )}
                <input
                  name="text"
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                  placeholder="Enter your commment"
                  className="py-5  w-[97%] mt-2 rounded-xl ring-1 ring-gray-300 px-2"
                  autoFocus
                  mt-1
                />

                <div className="flex gap-2 flex-row max-[200px]:flex-wrap justify-between mt-2 items-center">
                  <div className="flex items-center gap-2 cursor-pointer w-full">
                    <div>
                      <label htmlFor="image">
                        <ImagesIcon />
                      </label>
                      <input
                        type="file"
                        onChange={onchangeImage}
                        className="hidden"
                        id="image"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end w-full">
                    {user ? (
                      <button
                        onClick={saveComment}
                        className=" mt-2 flex-row flex-wrap flex items-center bg-black text-white  hover:font-medium py-2 px-2 rounded-md gap-1 whitespace-nowrap"
                        type="submit"
                      >
                        Send <SendIcon size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => notAuth(location)}
                        className=" mt-2 flex-row flex-wrap flex items-center bg-black text-white  hover:font-medium py-2 px-2 rounded-md gap-1 whitespace-nowrap"
                        type="submit"
                      >
                        Send <SendIcon size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[97%] h-[1px] bg-gray-900 dark:bg-gray-300/90  my-6" />

              <div>
                <h1 className="mb-3 w-[100vw] text-black dark:text-white/70 font-medium text-xl capitalize">
                  comment
                </h1>
                {eachUserPost &&
                  eachUserPost.comment.map((comm: any, index: any) => (
                    <div
                      key={index}
                      className="text-black mb-2 dark:text-white"
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            comm.commentedBy.imageUrl
                              ? comm.commentedBy.imageUrl.url
                              : "/avater.jpg"
                          }
                          className="size-8 rounded-full"
                          alt="Users Profile"
                        />
                        <span className="font-semibold capitalize">
                          {comm.commentedBy
                            ? comm.commentedBy.firstName +
                              " " +
                              comm.commentedBy.lastName
                            : "Avater Deo"}
                        </span>
                      </div>
                      <div className="ml-6 mt-1 mb-4 bg-slate-50 dark:bg-black/30 drop-shadow-lg rounded-3xl px-3 py-2">
                        <p className="mb-3">{comm.text}</p>
                        {comm.imageUrl && (
                          <img
                            src={comm.imageUrl}
                            alt="comment photo"
                            className=" w-[97%] ring-1 ring-slate-200 rounded-md h-[20vh]"
                          />
                        )}
                        <p className="text-neutral-500 text-base font-medium mb-1">
                          {moment(comm && comm.createdAt).format(
                            "Do MMM YYYY, h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                {eachUserPost && eachUserPost.comment.length === 0 && (
                  <h1 className="w-full text-center font-semibold dark:text-white/50 mt-20 animate-pulse">
                    No Comment
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsList;
