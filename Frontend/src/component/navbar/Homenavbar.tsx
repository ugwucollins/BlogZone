import clsx from "clsx";
import { NavMenu } from "../../content/NavMenu";
import { Link, useNavigate } from "react-router-dom";
import {
  LogInIcon,
  LogOutIcon,
  LucideMenu,
  TriangleAlertIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { Cover } from "../ui/cover";
import { motion } from "framer-motion";
import { Links } from "../../content/NavMenu";
import { LogOutHandler, UserAuth } from "../../content/usersContext";
import ProfIle from "../../data/ProfIle";
import { usePost } from "../Posts/postsContext";
import { Getheme } from "../../App";
import { MoonIcon, SunIcon } from "lucide-react";

const Homenavbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openlog, setopenlog] = useState<boolean>(false);
  const { user, setUser, setrouterPath }: any = UserAuth();
  const { search, setsearch }: any = usePost();
  const router = useNavigate();

  const handleCloselog = () => {
    setopenlog(!openlog);
  };
  const { themeControl, darkMode }: any = Getheme();
  return (
    <>
      <section className="w-full z-30 bg-white dark:bg-black/90 drop-shadow-lg rounded shadow-md text-black h-[10vh] sticky left-0 top-0 flex">
        <div className="flex items-center w-1/2 max-[820px]:w-full">
          <img
            src="/logo.png"
            alt="logo"
            className={clsx("dark:bg-white size-20 max-[300px]:size-10")}
          />
          <h1 className="flex text-black dark:text-white  whitespace-nowrap max-[200px]:flex-wrap font-bold text-3xl max-[300px]:text-xl">
            Blog
            <span className="font-bold text-3xl max-[300px]:text-xl text-blue-700">
              Zone
            </span>
          </h1>
        </div>

        <div className="w-full flex flex-grow justify-around items-center max-[820px]:hidden">
          <div className="w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-full p-2 bg-slate-400/20 rounded-lg focus:outline-none dark:text-white"
              autoFocus
            />
          </div>

          <div className="flex align-middle gap-2 w-full justify-end mx-4 mr-3 items-center">
            <NavMenu />

            {user ? (
              <ProfIle className="" />
            ) : (
              <>
                <Link to={"/auth/Login"}>
                  <button className="text-black dark:bg-slate-50 dark:text- px-4 font-bold transition duration-100 py-2 rounded">
                    Login
                  </button>
                </Link>
                <Link to={"/auth/signUp"}>
                  <button className="whitespace-nowrap rounded">
                    <Cover className="font-semibold">Sign Up</Cover>
                  </button>
                </Link>
              </>
            )}
          </div>

          <div onClick={themeControl} className="-mt-2">
            <p className="sticky right-4 dark:text-white text-black">
              {darkMode ? (
                <SunIcon
                  size={28}
                  className="text-white bg-red-800/60 rounded-full"
                />
              ) : (
                <MoonIcon size={28} />
              )}
            </p>
          </div>
        </div>

        <div className="w-full relative cursor-pointer justify-end mr-2 hidden max-[820px]:flex items-center">
          {!open && (
            <LucideMenu
              onClick={() => setOpen(!open)}
              className="dark:text-white text-black"
            />
          )}

          <div onClick={themeControl} className="ml-1">
            <p className=" dark:text-white text-black">
              {darkMode ? (
                <SunIcon
                  size={26}
                  className="text-white bg-red-700/40 rounded-full"
                />
              ) : (
                <MoonIcon size={26} />
              )}
            </p>
          </div>
        </div>
      </section>

      {open && (
        <div className="dark:text-white absolute text-black flex mr-1  top-7 items-center duration-[1s] right-3 z-[61]">
          <X onClick={() => setOpen(!open)} />

          <div onClick={themeControl} className="ml-1">
            <p className=" dark:text-white text-black">
              {darkMode ? (
                <SunIcon
                  size={26}
                  className="text-white bg-red-700/40 rounded-full"
                />
              ) : (
                <MoonIcon size={26} />
              )}
            </p>
          </div>
        </div>
      )}

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            x: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          className="max-h-screen overflow-hidden"
        >
          <div
            className={clsx(
              "absolute w-full h-screen sm:h-[100vh] dark:bg-black/80  overflow-hidden transition hidden bg-white duration-1000 max-[820px]:flex z-[60] top-0 left-0 bottom-0"
            )}
          >
            <div className="relative mt-5 mx-7 w-full h-full">
              <div className="flex flex-col flex-1 overflow-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  <Links />
                  {user ? (
                    <button
                      className="flex text-black dark:text-white gap-2 mt-2"
                      onClick={() => {
                        setopenlog(true);
                        setOpen(false);
                      }}
                      // onClick={() => LogOutHandler(router, setUser)}
                    >
                      <LogOutIcon />
                      <motion.p
                        whileHover={{
                          x: 6,
                        }}
                        transition={{
                          duration: 0.1,
                        }}
                      >
                        LogOut
                      </motion.p>
                    </button>
                  ) : (
                    <Link
                      to={"/auth/login"}
                      className="flex text-black dark:text-white gap-2 mt-2"
                    >
                      <LogInIcon />
                      <motion.p
                        whileHover={{
                          x: 6,
                        }}
                        transition={{
                          duration: 0.1,
                        }}
                      >
                        Login
                      </motion.p>
                    </Link>
                  )}
                </div>
              </div>

              <div className="absolute bottom-9 left-0">
                {user ? (
                  <Link
                    to={"/Userprofile"}
                    onClick={() => setrouterPath("/Userprofile")}
                  >
                    <ProfIle className="flex-row-reverse" />
                  </Link>
                ) : (
                  <div
                    className={clsx(
                      "flex gap-2 flex-row-reverse items-center cursor-pointer mt-1"
                    )}
                  >
                    <h1 className="font-semibold text-black dark:text-white">
                      {user ? user.firstName : "avater"}
                    </h1>
                    <img
                      className="size-12 rounded-full ring-1"
                      src={user ? user.imageUrl : "avater.png"}
                      alt={user ? user.lastName : "Deo"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
          <div className="w-full z-50 bg-black/20 h-[98vh] absolute m-0 top-0 left-0">
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

      {/* {open && (
        <div
          className={clsx(
            "absolute w-full h-[90vh] transition hidden duration-1000 max-[820px]:block z-50"
          )}
        >
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10 overflow-hidden">
              <div className="flex flex-col flex-1 overflow-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  <Links />
                  {user ? (
                    <button
                      className="flex text-black gap-2 mt-2"
                      onClick={() => LogOutHandler(router, setUser)}
                    >
                      <LogOutIcon />
                      <motion.p
                        whileHover={{
                          x: 6,
                        }}
                        transition={{
                          duration: 0.1,
                        }}
                      >
                        LogOut
                      </motion.p>
                    </button>
                  ) : (
                    <Link
                      to={"/auth/login"}
                      className="flex text-black gap-2 mt-2"
                    >
                      <LogInIcon />
                      <motion.p
                        whileHover={{
                          x: 6,
                        }}
                        transition={{
                          duration: 0.1,
                        }}
                      >
                        Login
                      </motion.p>
                    </Link>
                  )}
                </div>
              </div>

              <div>
                <SidebarLink
                  className="font-bold items-center capitalize"
                  link={{
                    label: `${
                      user ? user.firstName + " " + user.lastName : "Avater Doe"
                    }`,
                    href: `${user ? "/UserProfile" : "#"}`,
                    icon: (
                      <img
                        src={user ? user.imageUrl : "avater.jpg"}
                        className="size-12 items-center ring-1 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
      )} */}
    </>
  );
};

export default Homenavbar;

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black items-center dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />

      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, dur: 4 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <h1 className="flex whitespace-nowrap font-bold text-2xl">
          Blog <span className="font-bold text-2xl text-blue-700">Zone</span>
        </h1>
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
