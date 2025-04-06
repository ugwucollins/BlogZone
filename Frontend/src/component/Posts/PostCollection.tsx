import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterPosts, usePost } from "./postsContext";
import { AdminUrl } from "../../content/Types";
import { PostNotFound } from "../Not-Found";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { HeartIcon, PlusIcon } from "lucide-react";
import { UserAuth } from "../../content/usersContext";
import { BlogZoneLoader } from "../../content/loading";
import { CardsVartiant } from "../ui/apple-cards-carousel";
import { IconHeartFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";
import Api from "../../Axios/Api";

const PostCollection = () => {
  const [categorates, setcategorates] = useState("");
  const [sort, setsort] = useState("");
  const router = useNavigate();
  const { user, userRole }: any = UserAuth();
  const [selectedIndex, setselectedIndex] = useState(0);
  const [morePost, setmorePost] = useState(16);
  const [filteredPosts, setfilteredPosts] = useState([]);

  const categorate = [
    {
      text: "All",
      label: "",
    },
    {
      text: "destinaton",
      label: "destinaton",
    },
    {
      text: "culinary",
      label: "culinary",
    },
    {
      text: "lifestyle",
      label: "lifestyle",
    },
    {
      text: "tips_&_Hacks",
      label: "tips_&_Hacks",
    },
  ];

  const { posts, isloading, search }: any = usePost();

  const Likes = (post: any) => {
    return post.likes.find((post: any) => post._id === user._id);
  };
  const seeMorePost = () => {
    setmorePost((pev) => pev + 10);
  };
  const seeLessPost = () => {
    setmorePost((pev) => pev - 10);
  };

  const LikePostHandler = async (_id: any, push: boolean) => {
    const data = {
      userId: user._id,
      islike: push,
    };

    try {
      const res = await Api.put(`/posts/like/${_id}`, data);
      const isLike = res.data;
      if (isLike.success) {
        toast.success(isLike.message);
      }
      // seteachUserPost(isLike.post);
    } catch (error: any) {
      console.log(error);
      toast.error("opps! something went wrong, Try again later");
    }
  };

  const newest = () =>
    setfilteredPosts(
      filterPosts(posts, categorates).sort((a: any, b: any) => b._id - a._id)
    );

  useEffect(() => {
    const SearchInput = () => setcategorates(search || categorates);
    SearchInput();

    if (sort === "Newest") {
      newest();
    } else {
      setfilteredPosts(filterPosts(posts, categorates));
    }
  }, [categorates, posts, search, sort]);

  return (
    <>
      <div className="mx-2 my-5 w-full h-auto">
        {user && userRole === "bloggers" && (
          <div className="flex w-[99%] justify-end">
            <Link to={`${AdminUrl}/posts/createPost`}>
              <button className="flex gap-1 bg-black text-white dark:bg-white font-medium p-3 rounded-lg dark:text-black">
                Create Post <PlusIcon />
              </button>
            </Link>
          </div>
        )}
        <h1 className="text-3xl lg:text-5xl flex flex-row flex-wrap items-center font-bold mb-1 text-black dark:text-white">
          {Array.from("Blogs").map((text: any, index: any) => (
            <motion.h1
              variants={CardsVartiant(index, 0.2)}
              whileInView={"show"}
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              {text === " " ? `\u00A0` : text}
            </motion.h1>
          ))}
        </h1>

        <p className="text-neutral-500 dark:text-white/90 mb-2 w-full">
          Here, we share travel tips, destinaton guides and stories that inspire
          your next adventure.
        </p>

        <div className="flex justify-between gap-2 w-full max-[500px]:flex-wrap mb-5 items-center">
          <div className="w-full">
            <div className="flex gap-2 dark:text-white flex-wrap justify-center sm:justify-start">
              {categorate.map(({ text, label }, index) => (
                <div
                  onClick={() => {
                    setselectedIndex(index);
                    setcategorates(label);
                  }}
                  key={index}
                  className={cn(
                    "cursor-pointer text-neutral-700 text-lg px-2 py-1 w-auto h-auto rounded-lg",
                    // text === categorates
                    //   ? "text-black font-semibold bg-black/10 dark:text-white hover:text-white/90 hover:bg-black/40 transition"
                    //   :
                    index === selectedIndex &&
                      "text-black font-semibold bg-black/10 dark:text-white hover:text-white/90 hover:bg-black/40 transition"
                  )}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-end">
              <button className="font-medium mr-2 text-black dark:text-white whitespace-nowrap">
                Sort by:
              </button>

              <select
                onChange={(e) => setsort(e.target.value)}
                className="ring-1 ring-neutral-400 dark:bg-black dark:text-white rounded-md p-1 w-full max-w-max mr-1"
              >
                <option value="all">All</option>
                <option value="Newest">Newest Collection</option>
                <option value="Older">Older Collection</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full h-full relative overflow-auto">
          {isloading ? (
            <BlogZoneLoader className="min-h-[30vh] mt-[100px]" />
          ) : (
            <div className="flex flex-wrap flex-row gap-x-1 gap-y-6 w-full h-auto p-1 max-[500px]:justify-center justify-evenly lg:justify-evenly lg:gap-x-5">
              {filteredPosts
                .slice(0, morePost <= 0 ? 10 : morePost)
                .map((Post: any, index: number) => (
                  <motion.div
                    variants={PostVartiant(index)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.25 }}
                    key={index}
                    className="lg:w-[350px] max-[670px]:w-[460px] md:w-[400px] drop-shadow-lg shadow shadow-slate-400 px-2 h-auto py-3 rounded-lg max-[300px]:w-full w-full relative"
                  >
                    <div className="w-full h-full">
                      (
                      {Post ? (
                        <img
                          src={Post.imageUrl}
                          alt={"Post Image"}
                          className="w-full rounded-lg h-[38vh]"
                        />
                      ) : (
                        <div className="bg-slate-400/15 min-w-[300px] h-[20vh]"></div>
                      )}
                      )
                      <p className="w-auto absolute top-3 left-2 px-2 py-2 h-auto bg-neutral-800/60 rounded-3xl text-center text-white/85 font-medium text-[12px] capitalize flex flex-wrap">
                        {Post.categorate}
                      </p>
                      <p className="text-neutral-400 font-medium mt-1">
                        {moment(Post.createdDate).format("Do MMM YYYY, h:mm a")}
                      </p>
                      <Link
                        to={`/PostContent/${Post._id}`}
                        className="lg:hidden  flex flex-wrap"
                      >
                        <h2 className="font-semibold hover:underline mt-1 duration-300 text-black transition text-xl hover:font-bold dark:text-white">
                          {Post.title.length >= 50
                            ? Post.title.slice(0, 50) + " " + "..."
                            : Post.title}
                        </h2>
                      </Link>
                      <Link
                        to={`/PostContent/${Post._id}`}
                        className="md:hidden lg:flex  lg:flex-wrap hidden"
                      >
                        <h2 className="font-semibold hover:underline mt-1 duration-300 text-black transition text-xl hover:font-bold dark:text-white">
                          {Post.title.length >= 30
                            ? Post.title.slice(0, 30) + " " + "..."
                            : Post.title}
                        </h2>
                      </Link>
                      <p className="font-medium text-neutral-500 mb-3">
                        {Post.postMessage.length >= 120
                          ? Post.postMessage.slice(0, 120) + " " + "..."
                          : Post.postMessage}
                      </p>
                      <div className="w-full flex justify-between flex-row max-[237px]:flex-col-reverse max-[237px]:gap-3">
                        <div className="flex items-center flex-row flex-wrap gap-2">
                          <img
                            src={
                              Post.createdBy &&
                              Post.createdBy.imageUrl.secure_url
                            }
                            alt={Post.createdBy && Post.createdBy.lastName}
                            className="size-8 rounded-full bg-white"
                          />
                          <span className="font-semibold text-black dark:text-white">
                            {Post.createdBy &&
                              Post.createdBy.firstName + " " + Post.createdBy &&
                              Post.createdBy.lastName}
                          </span>
                        </div>

                        {!user ? (
                          <>
                            <div className="mr-4 flex gap-2 items-center cursor-pointer dark:text-white font-bold">
                              <span className="font-bold">
                                {Post.likes.length}{" "}
                                {Post.likes.length >= 1 ? "Like" : "Likes"}
                              </span>
                              <HeartIcon
                                onClick={() => router("/auth/login")}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {Likes(Post) ? (
                              <div className="mr-4 flex gap-2 items-center cursor-pointer  font-bold">
                                <span className="font-bold dark:text-white">
                                  {Post.likes.length}{" "}
                                  {Post.likes.length <= 1 ? "Like" : "Likes"}
                                </span>
                                <IconHeartFilled
                                  color="red"
                                  className=" cursor-pointer"
                                  onClick={() =>
                                    LikePostHandler(Post._id, false)
                                  }
                                />
                              </div>
                            ) : (
                              <div className="mr-4 flex gap-2 items-center cursor-pointer dark:text-white font-bold">
                                <span className="font-bold">
                                  {Post.likes.length}{" "}
                                  {Post.likes.length <= 1 ? "Like" : "Likes"}
                                </span>
                                <HeartIcon
                                  className=" cursor-pointer"
                                  onClick={() =>
                                    LikePostHandler(Post._id, true)
                                  }
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              {filteredPosts.length === 0 && (
                <PostNotFound title={categorates} />
              )}
            </div>
          )}
          <div className="flex flex-row flex-wrap justify-between mx-3">
            <button
              className=" px-3 py-2 bg-black text-white rounded-lg mt-5 hover:font-semibold cursor-pointer"
              onClick={seeLessPost}
            >
              See Less
            </button>
            <button
              className=" px-3 py-2 bg-black text-white rounded-xl mt-5 hover:font-semibold cursor-pointer"
              onClick={seeMorePost}
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCollection;

export const PostVartiant = (index: any) => ({
  hidden: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 1,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1.3,
      delay: 0.8 * index,
      damping: 8,
      ease: "easeOut",
    },
  },
});
