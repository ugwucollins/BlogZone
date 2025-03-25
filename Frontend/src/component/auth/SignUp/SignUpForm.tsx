import React, { useState } from "react";
import { Input } from "./input";
import { cn } from "../../../lib/utils";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { VailationSignUp } from "../../../content/FormVaildation";
import { Link, useNavigate } from "react-router-dom";
import Api, { PHOTO_URL } from "../../../Axios/Api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BlogZoneLoader } from "../../../content/loading";

export function SignupForm() {
  const [formerr, setformerr] = useState<any>({});
  const router = useNavigate();

  const [loading, setloading] = useState(false);
  const [imgUrl, setimgUrl] = useState({ file: null, url: "/avater.jpg" });
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
    const { email, firstName, lastName, password } =
      Object.fromEntries(formData);
    const data = {
      email,
      firstName,
      lastName,
      imageUrl: imgUrl.file,
      password,
    };

    const isVaild = VailationSignUp(
      email,
      firstName,
      lastName,
      setformerr,
      password
    );
    if (!isVaild) {
      console.log("hh");
    } else {
      try {
        const res = await Api.post("/users/signUp", data);
        const userData = res.data;

        if (userData.success) {
          console.log(userData);
          const alert = () => toast.success(userData.message);
          alert();
          setTimeout(() => {
            router("/auth/login");
          }, 1000);
        } else {
          console.log(userData);
          const alert = () => toast.error(userData.message);
          alert();
          router("/signUp");
        }
      } catch (error: any) {
        const alert = () => toast.error(error.response.data.message);
        alert();
      }
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
          Welcome to BlogZone
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
                  className="size-36 rounded-full ring-1 mb-2"
                />
              )}
              <h1 className="font-semibold">Upload Photo</h1>
              {formerr.imageUrl && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.imageUrl}{" "}
                </span>
              )}
            </Label>

            <Input
              id="file"
              // name="imageUrl"
              name="file"
              type="file"
              className="hidden"
              onChange={handleimgUrl}
            />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                name="firstName"
                type="text"
              />
              {formerr.firstName && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.firstName}{" "}
                </span>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Durden"
                type="text"
              />
              {formerr.lastName && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.lastName}{" "}
                </span>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
            {formerr.email && (
              <span className="text-red-700/75 mb-2 font-medium capitalize">
                {" "}
                {formerr.email}{" "}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
            {formerr.password && (
              <span className="text-red-700/75 mb-2 font-medium capitalize">
                {" "}
                {formerr.password}{" "}
              </span>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="mt-1 text-black dark:text-white">
            Already have an account?
            <Link
              to={"/auth/login"}
              className="text-blue-900 hover:font-bold transition duration-500 font-medium ml-1"
            >
              Login
            </Link>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                OnlyFans
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const Label = ({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
    >
      {children}
    </label>
  );
};
