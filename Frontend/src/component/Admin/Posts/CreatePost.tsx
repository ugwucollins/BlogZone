import { motion } from "framer-motion";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../../auth/Login/LoginForm";
import Footer from "../../footer/Footer";
import Adminnavbar from "../../navbar/Adminnavbar";
import { useState } from "react";

import { Input } from "../../auth/SignUp/input";
import { UserAuth } from "../../../content/usersContext";
import { toast } from "react-toastify";
import Api, { PHOTO_URL } from "../../../Axios/Api";
import { useNavigate } from "react-router";
import { AdminUrl } from "../../../content/Types";
import BackButton from "../../../data/BackButton";
import { BlogZoneLoader } from "../../../content/loading";

const CreatePost = () => {
  const { user }: any = UserAuth();
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full min-h-[90vh] mb-2 text-black dark:text-white">
        {user && user.role === "bloggers" ? (
          <BackButton link="/posts" className="-mt-10" />
        ) : (
          <div className="fixed max-lg:w-[97%] w-[99%] z-10">
            <Adminnavbar />
          </div>
        )}
        <div
          className={`${
            user && user.role === "bloggers" ? "ml-0" : "ml-[21%]"
          } overflow-hidden`}
        >
          <CreatePosts />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

const CreatePosts = () => {
  const { user }: any = UserAuth();
  const router = useNavigate();

  const [loading, setloading] = useState(false);
  const [imgUrl, setimgUrl] = useState({ file: null, url: "" });
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, postMessage, categorate, content } =
      Object.fromEntries(formData);
    const data = {
      title: title,
      postMessage: postMessage,
      categorate: categorate,
      createdBy: user._id,
      content: content,
      imageUrl: imgUrl.url,
    };

    try {
      const res = await Api.post("/posts", data);
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
    <>
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
        <div className="md:max-w-[600px] mt-20 max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Create Post
          </h2>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-3">
              <Label
                htmlFor="file"
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                {loading ? (
                  <BlogZoneLoader />
                ) : (
                  <img
                    src={imgUrl.url}
                    alt={imgUrl.url}
                    className="w-[500px] rounded-2xl h-[230px] ring-1 mb-2"
                  />
                )}
                <h1 className="font-semibold">Upload Photo</h1>
              </Label>

              <Input
                id="file"
                name="file"
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
              >
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
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                placeholder="projectmayhem@fc"
                type="text"
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="postMessage">body</Label>
              <textarea
                name="postMessage"
                id="postMessage"
                className="outline dark:bg-neutral-800 bg-transparent  dark:text-white text-black rounded-2xl outline-slate-500/30 p-3"
                cols={30}
                rows={6}
              />
              <BottomGradient />
            </LabelInputContainer>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <button
              className="bg-gradient-to-br capitalize relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              CreatePost &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};
