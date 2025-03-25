import React, { useState } from "react";
import { Input } from "../SignUp/input";
import { cn } from "../../../lib/utils";

import { VailationLogin } from "../../../content/FormVaildation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../Axios/Api";
import { UserAuth } from "../../../content/usersContext";
import { motion } from "framer-motion";

export function LoginForm() {
  const [formerr, setformerr] = useState<any>({});
  const { setUser }: any = UserAuth();
  const router = useNavigate();

  let formerrmessages = formerr.email ? formerr.email : formerr.password;
  const notifyerror = () => toast.error(formerrmessages);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    const isVaild = VailationLogin(email, setformerr, password);
    if (!isVaild) {
      console.log("hh");
      notifyerror();
    } else {
      try {
        const data = {
          email,
          password,
        };

        const res = await Api.post("/users/login", data);
        const userData = await res.data;
        console.log(userData.message);

        if (userData.success === false) {
          const alerts = () => toast.error(userData.message);
          console.log(userData);
          setformerr(userData.message);
          alerts();
          router("/auth/login");
        }

        window.location.reload();
        setUser(userData.user);
        console.log(userData.user);
        localStorage.setItem("tokens", userData.token);
        localStorage.setItem("token", userData.user._id);
        const alert = () =>
          toast.success(userData.message, {
            delay: 7,
          });

        alert();
      } catch (error: any) {
        const alerts = () => toast.error(error.response.data.message);
        alerts();
      }
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
        <div className="md:max-w-[600px] mt-[22vh] max-w-lg w-full mx-auto  md:rounded-2xl drop-shadow-lg p-4 md:p-8 shadow-md bg-white dark:bg-black rounded-xl">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome Back to BlogZone
          </h2>

          <form className="my-8" onSubmit={handleSubmit}>
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
              Login &rarr;
              <BottomGradient />
            </button>

            <div className="mt-2 text-black dark:text-white">
              You dont have an account?
              <Link
                to={"/auth/signUp"}
                className="text-blue-900 hover:font-bold transition duration-500 font-medium ml-1"
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
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

export const Label = ({
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
