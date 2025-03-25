import { useLocation, useNavigate, useParams } from "react-router";
import Footer from "../../footer/Footer";
import Adminnavbar from "../../navbar/Adminnavbar";
import { motion } from "framer-motion";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../../auth/Login/LoginForm";
import { Input } from "../../auth/SignUp/input";
import { useEffect, useState } from "react";
import { usePost } from "../../Posts/postsContext";
import Api, { PHOTO_URL } from "../../../Axios/Api";
import { toast } from "react-toastify";
import { AdminUrl } from "../../../content/Types";
import { BlogZoneLoader } from "../../../content/loading";

const PostContentA = () => {
  const { _id: id } = useParams();

  localStorage.setItem("adminPost", JSON.stringify(id));
  const get_id: any = localStorage.getItem("adminPost");
  const _id = JSON.parse(get_id);
  const { posts }: any = usePost();

  const UsersPost = posts.find((post: any) => post._id === _id);
  useEffect(() => {
    // console.log();
  }, [UsersPost]);
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full min-h-[90vh] mb-2 text-black dark:text-white">
        <Adminnavbar />
        <div className="ml-[21%] overflow-hidden">
          <EditPost UsersPost={UsersPost} />
        </div>
      </div>
      <div className="w-auto ml-[20%] overflow-x-visible min-w-fit">
        <Footer />
      </div>
    </div>
  );
};

export default PostContentA;

const EditPost = ({ UsersPost }: any) => {
  const [EditPost, setEditPost] = useState(UsersPost && UsersPost);

  const { posts, setPosts }: any = usePost();
  const router = useNavigate();

  const handleDelete = async () => {
    const res = await Api.delete(`/posts/${EditPost._id}`);
    const filter = posts.filter((post: any) => post._id !== EditPost._id);
    try {
      if (res.data) {
        console.log(filter);
        setPosts(filter);
        console.log(res);
        setTimeout(() => {
          router(`${AdminUrl}/posts`);
        }, 1100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setloading] = useState(false);
  const [imgUrl, setimgUrl] = useState({
    file: EditPost && EditPost.imageUrl,
    url: EditPost && EditPost.imageUrl,
  });
  const { VITE_REACT_CLOUD_NAME, VITE_REACT_UPLOAD_PRESET_NAME } = import.meta
    .env;

  const handleimgUrl = async (event: any) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", `${VITE_REACT_UPLOAD_PRESET_NAME}`);
    data.append("cloud_name", `${VITE_REACT_CLOUD_NAME}`);
    if (!file) return;

    try {
      setloading(true);
      const res = await fetch(PHOTO_URL, {
        method: "POST",
        body: data,
      });
      const uploadedImage = await res.json();
      console.log(uploadedImage);
      setimgUrl({
        file: uploadedImage,
        url: uploadedImage.url,
      });
      setloading(false);
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  const Onchange = (e: any) => {
    const { name, value } = e.target;

    setEditPost({ ...EditPost, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const data = {
      title: EditPost.title,
      postMessage: EditPost.postMessage,
      categorate: EditPost.categorate,
      content: EditPost.content,
      imageUrl: imgUrl.url,
    };
    try {
      const res = await Api.put(`/posts/${EditPost._id}`, data);
      const post = res.data;
      if (post.success === true) {
        const alert = () => toast.success(post.message);
        alert();
        setTimeout(() => {
          router(`${AdminUrl}/posts`);
        }, 1100);
      } else {
        const alert = () => toast.error(post.message);
        alert();
      }
    } catch (error: any) {
      console.log(error);
      const alert = () => toast.error(error.response.data.message);
      alert();
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="md:max-w-[600px] max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Edit Post
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-3">
            <Label
              htmlFor="file"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              {loading ? (
                <BlogZoneLoader className="min-h-[30vh] mt-[100px]" />
              ) : (
                <img
                  src={imgUrl.url || imgUrl.file.url}
                  alt={imgUrl.url}
                  className="w-[500px] rounded-2xl h-[230px] ring-1 mb-2"
                />
              )}

              <h1 className="font-semibold">Upload Photo</h1>
            </Label>

            <Input
              id="file"
              name="imageUrl"
              placeholder="projectmayhem@fc.com"
              type="file"
              className="hidden"
              onChange={handleimgUrl}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-3">
            <Label htmlFor="categorate">Categorate</Label>

            <select
              name="categorate"
              id="categorate "
              className="p-2 outline-slate-500/50 bg-transparent dark:bg-neutral-800 rounded-md outline dark:text-white text-black"
              value={EditPost && EditPost.categorate}
              onChange={Onchange}
            >
              <option value={EditPost && EditPost.categorate}>
                {EditPost && EditPost.categorate}
              </option>
              <option value="destinaton">Destinaton</option>
              <option value="culinary">Culinary</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="tips_&_Hacks">Tips_&_Hacks</option>
            </select>
            <BottomGradient />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="projectmayhem@fc"
              type="text"
              value={EditPost && EditPost.title}
              onChange={Onchange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="Content">Content</Label>
            <Input
              id="Content"
              name="content"
              placeholder="projectmayhem@fc"
              type="text"
              value={EditPost && EditPost.content}
              onChange={Onchange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="postMessage">body</Label>
            <textarea
              name="postMessage"
              id="postMessage"
              className="outline dark:bg-neutral-800 bg-transparent  dark:text-white text-black rounded-2xl outline-slate-500/30 p-3"
              onChange={Onchange}
              cols={30}
              rows={6}
              value={EditPost && EditPost.postMessage}
            />
            <BottomGradient />
          </LabelInputContainer>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="bg-gradient-to-br relative group/btn from-red-500 dark:from-red-600 dark:to-zinc-900 to-red-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              Delete &rarr;
              <BottomGradient />
            </button>

            <button
              className="bg-gradient-to-br capitalize relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              update &rarr;
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
