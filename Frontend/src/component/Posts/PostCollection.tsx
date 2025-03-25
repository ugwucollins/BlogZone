import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { filterPosts, usePost } from "./postsContext";
import { AdminUrl } from "../../content/Types";
import { PostNotFound } from "../Not-Found";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { UserAuth } from "../../content/usersContext";
import { BlogZoneLoader } from "../../content/loading";

const PostCollection = () => {
  const [categorates, setcategorates] = useState("");
  const [sort, setsort] = useState("");
  const { user, userRole }: any = UserAuth();
  const [selectedIndex, setselectedIndex] = useState(0);
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
  console.log(posts);
  console.log(filteredPosts);

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
  const vartiant = {
    hidden: {
      y: 90,
      opacity: 0,
      transition: { type: "spring", duration: 1, delay: 0.3 },
    },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 2.2, delay: 0.5, stiffness: 110 },
    },
  };

  return (
    <motion.div
      variants={vartiant}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.25 }}
      className="w-full h-full relative"
    >
      <div className="mx-2  my-5 w-full h-auto">
        {user && userRole === "bloggers" && (
          <Link to={`${AdminUrl}/posts/createPost`}>
            <div className="flex w-[99%] justify-end">
              <button className="flex gap-1 bg-black text-white dark:bg-white font-medium p-3 rounded-lg dark:text-black">
                Create Post <PlusIcon />
              </button>
            </div>
          </Link>
        )}
        <h1 className="text-3xl font-bold mb-1 text-black dark:text-white">
          Blogs
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

        <div className="w-full h-full relative">
          {isloading ? (
            <BlogZoneLoader className="min-h-[30vh] mt-[100px]" />
          ) : (
            <div className="flex flex-wrap  gap-x-1 gap-y-6 w-full h-auto p-1 max-[500px]:justify-center justify-evenly lg:justify-start lg:gap-x-5">
              {filteredPosts.map((Post: any, index: number) => (
                <motion.div
                  variants={PostVartiant(index)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.25 }}
                >
                  <div
                    key={index}
                    className="lg:w-[350px] max-[670px]:w-[450px] min-w-[500px] drop-shadow-lg  shadow shadow-slate-400 px-2 h-auto py-3 rounded-lg w-full"
                  >
                    <div className="w-full h-full relative flex flex-col">
                      (
                      <img
                        src={Post.imageUrl}
                        alt={Post.title}
                        className="w-full rounded-lg min-h-50 h-full"
                      />
                      )
                      <p className="w-auto absolute top-3 left-2 px-2 py-2 h-auto bg-neutral-800/60 rounded-3xl text-center text-white/85 font-medium text-[12px] capitalize">
                        {Post.categorate}
                      </p>
                      <p className="text-neutral-400 font-medium mt-1">
                        {moment(Post.createdDate).format("Do MMM YYYY, h:mm a")}
                      </p>
                      <Link
                        to={`/PostContent/${Post._id}`}
                        className="lg:hidden"
                      >
                        <h2 className="font-semibold hover:underline mt-1 duration-300 text-black transition text-xl hover:font-bold dark:text-white">
                          {Post.title.length >= 50
                            ? Post.title.slice(0, 50) + " " + "..."
                            : Post.title}
                        </h2>
                      </Link>
                      <Link
                        to={`/PostContent/${Post._id}`}
                        className="max-md:hidden"
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
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            Post.createdBy && Post.createdBy.imageUrl.secure_url
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
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredPosts.length === 0 && (
                <PostNotFound title={categorates} />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCollection;

export const PostVartiant = (index: any) => ({
  hidden: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 1,
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.8 * index,
      damping: 8,
      ease: "easeOut",
    },
  },
});
