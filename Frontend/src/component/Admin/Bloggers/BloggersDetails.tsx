import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Adminnavbar from "../../navbar/Adminnavbar";
import { motion } from "framer-motion";

import Footer from "../../footer/Footer";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../../auth/Login/LoginForm";
import { AdminUrl } from "../../../content/Types";
import BackButton from "../../../data/BackButton";
import { Input } from "../../auth/SignUp/input";
import { Link } from "react-router-dom";
import { GetTotalUsers } from "../AdminContext/UserAdminContext";
import { toast } from "react-toastify";
import Api from "../../../Axios/Api";

const BloggersDetails = () => {
  const { _id: id } = useParams();

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full min-h-[90vh] mb-2 text-black dark:text-white">
        <Adminnavbar />
        <div className="ml-[21%] overflow-hidden">
          <BlggerDetailEdite id={id} />
        </div>
      </div>
      <div className="w-auto ml-[20%] overflow-x-visible min-w-fit">
        <Footer />
      </div>
    </div>
  );
};

export default BloggersDetails;

export function BlggerDetailEdite({ id }: { id: string | undefined }) {
  //   const router = useNavigate();
  const { AllUsers }: any = GetTotalUsers();
  const AllBloggers = AllUsers.find((user: any) => user._id === id);

  // const { user }: any = UserAuth();

  const [imageUrl, setimageUrl] = useState({
    file: AllBloggers && AllBloggers.imageUrl,
    url: AllBloggers && AllBloggers.imageUrl.url,
  });

  const [role, setrole] = useState(AllBloggers && AllBloggers.role);
  const [postP, setpostP] = useState(AllBloggers && AllBloggers.postRequest);
  const router = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const data = {
      role: role,
      postRequest: postP,
      roleRequest: AllBloggers.roleRequest,
    };

    try {
      const res = await Api.put(`/users/role/${AllBloggers.email}`, data);
      const userData = res.data;
      console.log(userData);

      if (userData.success) {
        const alert = () => toast.success(userData.message);
        alert();
        setTimeout(() => {
          router(`${AdminUrl}/bloggers`);
        }, 1100);
      } else {
        const alert = () => toast.error(userData.message);
        alert();
      }
    } catch (error: any) {
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
      <BackButton
        link={AdminUrl + "/bloggers"}
        className="ml-[20%] mt-7 sm:flex hidden"
      />

      <div className="md:max-w-[600px] max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white drop-shadow-md dark:bg-black">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Edit UserDetails
        </h2>

        <form className="mt-6 mb-2" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-3">
            <div className="flex flex-col justify-center mb-4 items-center cursor-pointer">
              <img
                src={AllBloggers && imageUrl.url}
                alt={imageUrl.url}
                className="size-36 rounded-full ring-1 mb-2"
              />
            </div>
          </LabelInputContainer>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                value={AllBloggers && AllBloggers.firstName}
                type="text"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={AllBloggers && AllBloggers.lastName}
                placeholder="Durden"
                type="text"
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={AllBloggers && AllBloggers.email}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Role</Label>
            <select
              name="role"
              value={role}
              className="p-2 outline-none focus:outline bg-slate-100/90 dark:bg-neutral-700/70 focus:outline-slate-400 rounded-md"
              onChange={(e) => setrole(e.target.value)}
            >
              <option value="Bloggers">Bloggers</option>
              <option value="user">user</option>
              <option value="Admin">Admin</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Create Post</Label>
            <select
              name="post"
              value={postP}
              className="p-2 outline-none focus:outline bg-slate-100/90 dark:bg-neutral-700/70 focus:outline-slate-400 rounded-md"
              onChange={(e) => setpostP(e.target.value)}
            >
              <option value={postP ? "Yes" : "No"}>
                {postP ? "Yes" : "No"}
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </LabelInputContainer>

          <div className="flex gap-2 max-[350px]:flex-wrap flex-row items-center w-full">
            <button className="bg-gradient-to-br relative group/btn from-red-700 dark:from-red-500 dark:to-red-500 to-red-700 block dark:bg-zinc-800 w-full text-white dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:animate-pulse">
              <Link
                to={AdminUrl + "/users"}
                className="w-full absolute rounded top-0 py-2 left-0"
              >
                Cancel
                <BottomGradient />
              </Link>
            </button>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-50 dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 w-full text-white dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:font-bold"
              type="submit"
            >
              Update User &rarr;
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
