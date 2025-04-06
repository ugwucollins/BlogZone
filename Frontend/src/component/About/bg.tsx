import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo";
import { useState } from "react";
import { X } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../auth/Login/LoginForm";
import { Input } from "../auth/SignUp/input";
// import { toast } from "react-toastify";
// import Api from "../../Axios/Api";
import { UserAuth } from "../../content/usersContext";
import { CardsVartiant } from "../ui/apple-cards-carousel";

export function AuroraBackgroundDemo() {
  const [open, setOpen] = useState(false);
  const AboutWord = "contact our friendly team";
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-2 items-center justify-center px-4"
      >
        <div className="text-3xl flex md:text-4xl lg:text-5xl flex-wrap justify-center w-full capitalize font-bold dark:text-white text-center">
          {Array.from(AboutWord).map((text: any, index: any) => (
            <motion.h1
              variants={CardsVartiant(index, 0.1)}
              whileInView={"show"}
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              {text === " " ? `\u00A0` : text}
            </motion.h1>
          ))}
        </div>
        <div className="text-base md:text-xl dark:text-neutral-300 mb-5">
          Let us know how we can help you
        </div>

        <div className="mt-7">
          <InfiniteMovingCardsDemo />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black font-medium hover:font-bold capitalize px-4 py-3 mt-8"
        >
          get in touch
        </button>
      </motion.div>
      {open && <ContactForm setOpen={setOpen} />}
    </AuroraBackground>
  );
}

export const ContactForm = ({ setOpen }: any) => {
  const [formerr, setformerr] = useState<any>({});
  const { user }: any = UserAuth();

  const [formData, setformData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    message: "",
  });

  const OnChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setformerr;
  };

  return (
    <div className=" absolute top-0 text-center text-black dark:text-white left-0 min-h-screen bg-black/50 w-full z-20 px-2 py-2">
      <button
        className=" absolute right-2 top-3 hover:animate-pulse cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <X size={30} className="text-white" />
      </button>
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
        <div className="md:max-w-[600px] max-w-lg w-full mx-auto rounded-xl md:rounded-2xl mt-20 p-4 md:p-8 shadow-lg bg-white dark:bg-black">
          <h1 className="mt-2 mb-4 text-xl font-semibold flex flex-row flex-wrap w-full item-center text-center justify-center">
            {Array.from("Our Contact").map((text: any, index: any) => (
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

          <form className="my-8 text-left" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Tyler"
                  name="firstName"
                  type="text"
                  onChange={OnChange}
                  value={formData.firstName}
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
                  onChange={OnChange}
                  name="lastName"
                  placeholder="Durden"
                  type="text"
                  value={formData.lastName}
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
                value={formData.email}
                onChange={OnChange}
              />
              {formerr.email && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.email}{" "}
                </span>
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                placeholder="content ..."
                rows={3}
                value={formData.message}
                onChange={OnChange}
                className="px-2 rounded-lg py-2 ring-1 dark:text-black ring-gray-200 drop-shadow shadow focus:outline-1 focus:outline-gray-400 placeholder:text-lg bg-blue-100"
              />

              <BottomGradient />
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
              disabled={user === null}
              onClick={() => console.log("hello")}
            >
              Comment &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
