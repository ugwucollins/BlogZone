import Adminnavbar from "../../navbar/Adminnavbar";
import Footer from "../../footer/Footer";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../../auth/Login/LoginForm";
import { Input } from "../../auth/SignUp/input";

import BackButton from "../../../data/BackButton";
import { AdminUrl } from "../../../content/Types";
import { GetTotalUsers } from "../AdminContext/UserAdminContext";
import { toast } from "react-toastify";
import Api from "../../../Axios/Api";
import { Link } from "react-router-dom";

const UsersDetails = () => {
  const { _id } = useParams();
  const { AllUsers }: any = GetTotalUsers();
  const users = AllUsers.find((user: any) => user._id === _id);
  const deleteusers = AllUsers.filter((user: any) => user._id !== _id);

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full min-h-[90vh] mb-2 text-black dark:text-white">
        <Adminnavbar />
        <div className="ml-[21%] overflow-hidden">
          {/* <UsersTable /> */}
          <UserDetailsEdit users={users} deleteusers={deleteusers} />
        </div>
      </div>
      <div className="w-auto ml-[20%] overflow-x-visible min-w-fit">
        <Footer />
      </div>
    </div>
  );
};

export default UsersDetails;

export function UserDetailsEdit({ users, deleteusers }: any) {
  // const router = useNavigate();
  const user = users;
  const [imageUrl, setimageUrl] = useState({
    file: user && user.imageUrl,
    url: user && user.imageUrl.url,
  });
  const [role, setrole] = useState(user && user.role);
  const [roleRequest, setroleRequest] = useState(user && user.roleRequest);

  const [postP, setpostP] = useState(user && user.postRequest);
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const data = {
      postRequest: postP,
      roleRequest: roleRequest,
      role: role,
    };

    try {
      const res = await Api.put(`/users/role/${user.email}`, data);
      const userData = res.data;

      if (userData.success) {
        const alert = () => toast.success(userData.message);
        alert();
        setTimeout(() => {
          router(`${AdminUrl}/users`);
          window.location.reload();
        }, 1000);
      } else {
        const alert = () => toast.error(userData.message);
        alert();
      }
    } catch (error: any) {
      const alert = () => toast.error(error.response.data.message);
      alert();
    }
  };
  const HandleDelete = async () => {
    try {
      const res = await Api.delete(`/users/${user._id}`);
      const userData = res.data;

      if (userData.success) {
        const alert = () => toast.success(userData.message);
        alert();
        setTimeout(() => {
          router(`${AdminUrl}/users`);
          window.location.reload();
        }, 1000);
        deleteusers();
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
        link={AdminUrl + "/users"}
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
                src={user && imageUrl.url}
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
                value={user && user.firstName}
                type="text"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={user && user.lastName}
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
              value={user && user.email}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Role</Label>
            <select
              name="role"
              className="p-2 outline-none focus:outline bg-slate-100/90 dark:bg-neutral-700/70 focus:outline-slate-400 rounded-md"
              onChange={(e) => setrole(e.target.value)}
            >
              <option value={role} className="capitalize">
                {role}
              </option>
              <option value="user">User</option>
              <option value="bloggers">Bloggers</option>
              <option value="admin">Admin</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Role Request</Label>
            <select
              name="roleRequest"
              className="p-2 outline-none focus:outline bg-slate-100/90 dark:bg-neutral-700/70 focus:outline-slate-400 rounded-md"
              onChange={(e) => setroleRequest(e.target.value)}
            >
              <option value={roleRequest} className="capitalize">
                {roleRequest === true ? "Yes" : "No"}
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Create Post</Label>
            <select
              name="post"
              className="p-2 outline-none focus:outline bg-slate-100/90 dark:bg-neutral-700/70 focus:outline-slate-400 rounded-md"
              onChange={(e) => setpostP(e.target.value)}
            >
              <option value={postP}>{postP === true ? "yes" : "No"}</option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>No</option>
            </select>
          </LabelInputContainer>

          <div className="flex gap-2 max-[350px]:flex-wrap flex-row items-center w-full">
            <button className="bg-gradient-to-br relative group/btn from-red-700 dark:from-red-500 dark:to-red-500 to-red-700 block dark:bg-zinc-800 w-full text-white dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:animate-pulse">
              <Link
                to={AdminUrl + "/users"}
                className="w-full absolute rounded top-0 py-2 left-0"
              >
                Cancle
              </Link>
              <BottomGradient />
            </button>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-50 dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 w-full text-white dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:font-bold"
              type="submit"
            >
              Update User &rarr;
            </button>
          </div>
        </form>
        <button
          onClick={HandleDelete}
          className="bg-gradient-to-br relative group/btn from-red-700 dark:from-red-500 dark:to-red-500 to-red-700 block dark:bg-zinc-800 w-full text-white dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:animate-pulse"
        >
          Delete
          <BottomGradient />
        </button>
      </div>
    </motion.div>
  );
}
