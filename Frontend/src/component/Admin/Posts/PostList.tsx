import { useEffect, useState } from "react";
import { filterPosts, usePost } from "../../Posts/postsContext";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { AdminUrl } from "../../../content/Types";
import moment from "moment";
import { Link } from "react-router-dom";
import { PostNotFound } from "../../Not-Found";
import { EllipsisVerticalIcon, PlusIcon } from "lucide-react";
import { BlogZoneLoader } from "../../../content/loading";

const PostList = () => {
  const [categorates, setcategorates] = useState("");
  const [sort, setsort] = useState("");
  const [selectedIndex, setselectedIndex] = useState(0);
  const [edit, setedit] = useState(false);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [morePost, setmorePost] = useState(16);

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
  const seeMorePost = () => {
    setmorePost((pev) => pev + 10);
  };
  const seeLessPost = () => {
    setmorePost((pev) => pev - 10);
  };

  const { posts, search, isloading }: any = usePost();
  const open = () => {
    setedit(!edit);
  };
  const newest = () =>
    setfilteredPosts(
      filterPosts(posts, categorates).sort((a: any, b: any) => b._id - a._id)
    );
  useEffect(() => {
    if (sort === "Newest") {
      newest();
    } else {
      setfilteredPosts(filterPosts(posts, categorates));
    }
  }, [categorates, posts, search, sort]);

  return (
    <motion.div
      initial={{ y: 85, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
    >
      <div className="mx-2  my-5 w-full h-auto">
        <div className="flex w-[95%] justify-end">
          <Link to={`${AdminUrl}/posts/createPost`}>
            <button className="flex gap-1 bg-black text-white dark:bg-white font-medium p-3 rounded-lg dark:text-black">
              Create Post <PlusIcon />
            </button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-1 text-black dark:text-white">
          Posts
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
                    setcategorates(label);
                    setselectedIndex(index);
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

        <div className="w-full h-auto">
          {isloading ? (
            <BlogZoneLoader className="min-h-[30vh] mt-[100px]" />
          ) : (
            <div className="flex flex-wrap gap-x-1 gap-y-6 w-full h-auto p-1 max-[500px]:justify-center justify-evenly lg:justify-evenly lg:gap-x-5">
              {filteredPosts
                .slice(0, morePost <= 0 ? 10 : morePost)
                .map((Post: any, index: number) => (
                  <div
                    key={index}
                    className="lg:w-[365px] max-[670px]:w-[450px] w-[500px] drop-shadow-lg shadow shadow-slate-400 px-2 h-auto py-3 rounded-lg"
                  >
                    <div className="w-full h-full relative flex flex-col">
                      <img
                        src={Post.imageUrl}
                        alt={Post.title}
                        className="w-full rounded-lg h-[38vh] max-sm:h-auto"
                      />
                      <p className="w-auto absolute top-3 left-2 px-2 py-2 h-auto bg-neutral-800/60 rounded-3xl text-center text-white/85 font-medium text-[12px] capitalize">
                        {Post.categorate}
                      </p>
                      <p className="text-neutral-400 font-medium mt-1">
                        {moment(Post.createdDate).format("Do MMM YYYY, h:mm a")}
                      </p>

                      <Link
                        to={`${AdminUrl}/users/posts/${Post._id}`}
                        className="lg:hidden block"
                      >
                        <h2 className="font-semibold hover:underline mt-1 duration-300 text-black transition text-xl hover:font-bold dark:text-white">
                          {Post.title.length >= 50
                            ? Post.title.slice(0, 50) + " " + "..."
                            : Post.title}
                        </h2>
                      </Link>

                      <Link
                        to={`${AdminUrl}/users/posts/${Post._id}`}
                        className="md:hidden lg:block hidden"
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

                      <div className="flex items-center justify-between gap-2 ">
                        <div className="flex items-center gap-2">
                          <img
                            src={Post.createdBy && Post.createdBy.imageUrl.url}
                            alt={Post.createdBy && Post.createdBy.lastName}
                            className="size-8 rounded-full bg-white"
                          />
                          <span className="font-semibold text-black dark:text-white">
                            {Post.createdBy &&
                              Post.createdBy.firstName + " " + Post.createdBy &&
                              Post.createdBy.lastName}
                          </span>
                        </div>
                        <div className="relative cursor-pointer">
                          <Link
                            to={`${AdminUrl}/posts/postcontent/${Post._id}`}
                          >
                            <EllipsisVerticalIcon onClick={open} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {!filteredPosts.length && <PostNotFound title={categorates} />}
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
    </motion.div>
  );
};

export default PostList;
