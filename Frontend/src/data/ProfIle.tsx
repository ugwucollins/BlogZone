import clsx from "clsx";
import { useState } from "react";
import { LogOutHandler, UserAuth } from "../content/usersContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TriangleAlertIcon, X } from "lucide-react";

const ProfIle = ({ className }: { className: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openlog, setOpenlog] = useState<boolean>(false);
  const { user, setUser, setrouterPath }: any = UserAuth();

  const router = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCloselog = () => {
    setOpenlog(!openlog);
  };

  return (
    <>
      <div className={clsx("relative -mt-2")}>
        <div
          className={clsx(
            "flex gap-2 items-center cursor-pointer ",
            className
          )}
          onClick={handleOpen}
        >
          <h1 className="font-semibold text-black dark:text-white">
            {user ? user.firstName : "avater"}
          </h1>
          <img
            className="size-12 rounded-full ring-1"
            src={user ? user.imageUrl.url : "avater.png"}
            alt={user ? user.imageUrl.display_name : "Deo"}
            onClick={handleOpen}
          />
        </div>

        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-44 absolute -right-2 h-20 bg-white drop-shadow-md rounded shadow mt-2 flex flex-col justify-center text-center">
              <Link
                to={"/Userprofile"}
                onClick={() => setrouterPath("/Userprofile")}
                className="text-xl text-center mt-1"
              >
                Manage ProfIle
              </Link>
              <div className="mx-2 border my-2" />
              <button
                onClick={() => setOpenlog(true)}
                className="cursor-pointer bg-black rounded-lg mx-2 mb-2 p-1 "
              >
                <p className="font-semibold hover:animate-pulse text-white">
                  LogOut
                </p>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {openlog && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
          }}
        >
          <div className="w-full bg-black/20 h-[98vh] absolute m-0 top-0 left-0">
            <div className="flex justify-center mt-[35vh] items-center text-center">
              <div className="w-[430px] relative h-[35vh] drop-shadow-lg rounded-lg bg-white">
                <div>
                  <span className="flex justify-center  text-center mt-7 mb-2">
                    <TriangleAlertIcon size={100} className="text-orange-500" />
                  </span>
                  <h1 className="font-semibold">
                    Are You Sure You Want To LogOut
                  </h1>

                  <X
                    onClick={() => handleCloselog()}
                    className="absolute right-3 top-2 cursor-pointer"
                  />

                  <div className="absolute bottom-2 right-3 mb-1">
                    <button
                      onClick={() => handleCloselog()}
                      className="py-2 cursor-pointer px-4 rounded-md font-medium bg-slate-100 mr-3"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => LogOutHandler(router, setUser)}
                      className="py-2 px-4 cursor-pointer text-white rounded-md font-medium bg-black ml-1"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProfIle;
