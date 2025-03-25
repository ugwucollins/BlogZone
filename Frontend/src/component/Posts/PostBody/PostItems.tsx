import { useEffect, useState } from "react";
import { usePost } from "../postsContext";
import Api from "../../../Axios/Api";
// import { toast } from "react-toastify";
import moment from "moment";
import { Post } from "../../../content/Types";
import {
  HeartIcon,
  ImagesIcon,
  LucideThumbsUp,
  PlusIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "../../../data/Button";
import clsx from "clsx";
import { notAuth, UserAuth } from "../../../content/usersContext";
import { useLocation } from "react-router-dom";
import { createCommentFun, useComment } from "../comment/CommentContext";

const PostItems = ({ id }: { id: string | any }) => {
  const { posts }: any = usePost();

  const _id = localStorage.getItem("postId");
  const location = useLocation();
  const eachPost = posts.find((post: any) => post._id === _id);
  const [eachUserPost, seteachUserPost] = useState<Post | any>(eachPost);
  const [imageUrl, setimageUrl] = useState({ file: null, url: "" });
  const [text, settext] = useState("");
  const { user }: any = UserAuth();

  localStorage.setItem("postId", id);
  localStorage.setItem("routerPath", `/PostContent/${id}`);

  const { comment, setcomment }: any = useComment();

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

  const saveComment = async () => {
    createCommentFun(imageUrl, text, comment, setcomment);
    setimageUrl({
      file: null,
      url: "",
    });
    settext("");
    // try {
    //   const res = await Api.get(`/posts/${_id}`);
    //   const data = res.data;
    //   seteachUserPost(data.postsid);
    // } catch (error: any) {
    //   console.log(error);

    //   // toast.error("opps! something went wrong, Try again later");
    // }
  };

  useEffect(() => {
    fetchPostId();
    seteachUserPost(eachPost);
  }, []);

  return (
    <div className="w-full relative my-4  overflow-hidden">
      <div className="flex justify-center">
        <div className="w-full flex max-[600px]:flex-col max-[600px]:gap-5 py-2 px-1 pb-3 ">
          <div className="w-full relative max-[800px]:w-[55%] max-h-screen">
            <h1 className="mt-3 text-[min(4rem,21px)] font-medium mb-2 text-black dark:text-white/80 text-wrap">
              {eachUserPost && eachUserPost.title}
            </h1>
            <img
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
            <p className="dark:text-white/75 text-black">
              {eachUserPost && eachUserPost.postMessage}
            </p>
          </div>

          <div className="max-[600px]:w-full border rounded-lg drop-shadow w-1/2 lg:w-1/2 min-h-screen mx-1">
            <div className="ml-4">
              <div className="flex items-center justify-between mr-2">
                <div className="flex items-center mt-5  mb-2 gap-2">
                  <img
                    src={`${
                      eachUserPost && eachUserPost.createdBy.imageUrl.url
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
                <h1 className="text-gray-600/90 dark:text-gray-300/95 font-medium">
                  1k Follows
                </h1>
              </div>
              <Button
                title="Follow"
                className="dark:text-white"
                Icon={<PlusIcon />}
              />
              <p className="mt-1 mb-2 text-black dark:text-white/80 capitalize">
                {eachUserPost && eachUserPost.categorate}
              </p>

              <div className="drop-shadow-lg right-1 mt-3 py-3 px-2 h-auto rounded-md mr-1 bg-slate-50">
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

                <div className="flex gap-2 justify-between mt-2 items-center">
                  <div className="flex items-center gap-2 cursor-pointer w-full">
                    <LucideThumbsUp />
                    <HeartIcon />
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

                  <div>
                    {user ? (
                      <button
                        onClick={saveComment}
                        className=" mt-2 flex items-center bg-black text-white  hover:font-medium py-2 px-2 rounded-md gap-1 whitespace-nowrap"
                        type="submit"
                      >
                        Send <SendIcon size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => notAuth(location)}
                        className=" mt-2 flex items-center bg-black text-white  hover:font-medium py-2 px-2 rounded-md gap-1 whitespace-nowrap"
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
                <h1 className="mb-3 text-black dark:text-white/70 font-medium text-xl capitalize">
                  comment
                </h1>
                {comment.map((comm: any, index: any) => (
                  <div key={index} className="text-black mb-2 dark:text-white">
                    <div className="flex gap-2 items-center">
                      <img
                        src="/avater.jpg"
                        className="size-8 rounded-full"
                        alt="avater"
                      />
                      <span>Avater Deo</span>
                    </div>
                    <div className="ml-6 mt-3 mb-4">
                      <p className="mb-2">{comm.text}</p>
                      {comm.imageUrl && (
                        <img
                          src={comm.imageUrl}
                          alt=""
                          className=" w-[97%] ring-1 ring-slate-200 rounded-md h-[20vh]"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItems;
