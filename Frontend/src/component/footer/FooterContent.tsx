import clsx from "clsx";
import { footerLinks, footerLinks2 } from "../../content/NavMenu";
import { useState } from "react";
import { FloatingDockDemo } from "./FloatingDockDemo";
import { CardsVartiant } from "../ui/apple-cards-carousel";
import { motion } from "framer-motion";
// import { LampContainer } from "../ui/lamp";

const FooterContent = () => {
  const now = new Date();
  const year = now.getFullYear();
  const [indexs, setIndex] = useState(0);

  return (
    <div
      className="
    w-full h-auto py-3 bg-black/95 text-white rounded-xl dark:ring-1 ring-slate-700"
    >
      <div className="flex gap-4 sm:flex-nowrap sm:justify-between justify-center flex-wrap w-full px-3">
        <div className="w-full sm:w-[40%] max-md:w-[80%]">
          <div className="flex items-center w-1/2 max-[820px]:w-full">
            <img
              src="/logo.png"
              alt="logo"
              className={clsx(
                "dark:bg-white size-16 rounded-xl mr-1 max-[300px]:size-8"
              )}
            />
            <h1 className="flex text-white max-lg:flex-nowrap items-center flex-row flex-wrap md:flex-nowrap font-bold text-2xl max-[300px]:text-xl">
              {Array.from("Blog").map((text: any, index: any) => (
                <motion.h1
                  variants={CardsVartiant(index, 0.2)}
                  whileInView={"show"}
                  initial="hidden"
                  key={index}
                  viewport={{ once: false, amount: 0.2 }}
                  className="whitespace-nowrap"
                >
                  {text}
                </motion.h1>
              ))}
              <span className="font-bold flex flex-nowrap max-sm:flex-wrap items-center flex-row text-2xl max-lg:flex-nowrap max-[300px]:text-xl text-blue-700">
                &nbsp;
                {Array.from("Zone").map((text: any, index: any) => (
                  <motion.h1
                    key={index}
                    variants={CardsVartiant(index, 0.2)}
                    whileInView={"show"}
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    {text}
                  </motion.h1>
                ))}
              </span>
            </h1>
          </div>
          <div>
            <p className="text-lg text-slate-300/90 font-medium mt-5">
              Our mission is to equip modern exploers with cutting-edge.
              Functional, ad stylish bags that elevate every adventure.
            </p>

            <p className="text-xl mt-[8vh] mb-2 font-medium text-white/90">
              &copy;{year} BlogZone. All right reserved.
            </p>
          </div>
        </div>

        <div>
          {footerLinks.map(({ text, label }, index: number) => (
            <div
              key={label}
              onClick={() => setIndex(index)}
              className={
                index === indexs
                  ? "text-white font-semibold mb-4 mt-3 whitespace-nowrap transition duration-300"
                  : "mb-4 mt-3 whitespace-nowrap text-white/70 cursor-pointer"
              }
            >
              {text}
            </div>
          ))}
        </div>

        <div>
          {footerLinks2.map(({ text, label }, index: number) => (
            <div
              key={label}
              onClick={() => setIndex(index)}
              className={
                index === indexs
                  ? "text-white font-semibold mb-4 mt-3 whitespace-nowrap transition duration-300"
                  : "mb-4 mt-3 whitespace-nowrap text-white/70 cursor-pointer"
              }
            >
              {text}
            </div>
          ))}
        </div>

        <div className="relative">
          <h1 className=" text-slate-200 mb-4 mt-3 capitalize font-medium text-lg">
            get updates
          </h1>
          <div className="mt-5 flex mx-2 gap-2 max-[339px]:flex-wrap max-[339px]:gap-y-4">
            <input
              type="email"
              placeholder=" Enter your email"
              className=" rounded-md w-full text-black/80 font-bold max-[339px]:p-4"
            />
            <button
              type="submit"
              className="capitalize text-black/90 hover:text-white hover:bg-gray-800 font-bold bg-slate-50 flex max-[339px]:justify-end rounded-lg p-[10px]"
            >
              subscribe
            </button>
          </div>
          <div>
            {/* <SocialHands />omm */}
            <FloatingDockDemo />

            <p className="capitalize mt-4 text-white/70 font-semibold sm:text-right text-left">
              privacy policy
              <span className="ml-4 font-semibold">terms of service</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
