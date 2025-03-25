import { Link } from "react-router-dom";
import Homenavbar from "./navbar/Homenavbar";
import { motion } from "framer-motion";
import Footer from "./footer/Footer";

const NotFound = () => {
  return (
    <>
      <Homenavbar />
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          damping: 10,
          duration: 1.5,
        }}
      >
        <div className="flex justify-center flex-col text-center">
          <div className="w-full flex justify-center items-center h-[80vh]">
            <img
              src="/notfound.png"
              alt="not found Image"
              className="w-[65%] h-full"
            />
          </div>
          <h1 className="text-3xl dark:text-white animate-bounce duration-1000 delay-1000 hover:animate-pulse font-semibold capitalize">
            Opps! Page{" "}
            <Link to={"/"}>
              <span className="cursor-pointer text-red-900 font-bold">
                Not Found
              </span>
            </Link>
            🙄
          </h1>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default NotFound;

export const PostNotFound = ({ title }: any) => {
  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        damping: 10,
        duration: 1.5,
      }}
      className="w-full"
    >
      <div className="flex justify-center flex-col text-center align-middle items-center w-fill">
        <div className="w-full flex justify-center items-center h-[65vh]">
          <img
            src="/notfound.png"
            alt="not found Image"
            className="w-[60%] h-full"
          />
        </div>
        <h1 className="text-3xl dark:text-white animate-bounce duration-1000 delay-1000 hover:animate-pulse font-semibold capitalize">
          {title} &nbsp;
          <Link to={"/"}>
            <span className="cursor-pointer text-red-900 font-bold">
              Not Found
            </span>
          </Link>
          🙄
        </h1>
      </div>
    </motion.div>
  );
};
