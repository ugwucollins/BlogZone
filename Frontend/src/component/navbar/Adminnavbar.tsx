import { IconDashboard } from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  BookAIcon,
  MoonIcon,
  Search,
  SunIcon,
  TriangleAlertIcon,
  UserIcon,
  X,
} from "lucide-react";
import { ReactElement, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Getheme } from "../../App";
import { LogOutHandler, UserAuth } from "../../content/usersContext";
import { AdminUrl } from "../../content/Types";

const Adminnavbar = () => {
  const { themeControl, darkMode }: any = Getheme();

  return (
    <>
      <div
        className="w-[19%] z-10 fixed h-full dark:shadow-slate-400 bg-white dark:bg-black rounded-2xl drop-shadow-md shadow-xl"
        // style={{
        //   border: "solid rgba(91, 89, 89, 0.71)",
        //   borderLeft: "0px",
        //   borderRight: "0px",
        // }}
      >
        <div className="flex flex-col  text-center justify-start overflow-hidden">
          <div className="flex gap-3 mt-1 flex-row items-center">
            <img
              src="/logo.png"
              alt="logo"
              className="size-16 rounded-xl bg-cover object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            >
              <div className="capitalize max-[700px]:hidden font-bold dark:text-white text-2xl max-[900px]:text-lg flex flex-wrap gap-x-1">
                Blog <span className="text-blue-700 font-bold">zone</span>
              </div>
            </motion.div>
          </div>

          <SideBarDisplay />
        </div>
      </div>

      <div className="w-[80%] ml-[21%] mb-5 lg:ml-[20%] z-20 dark:shadow-slate-200 dark:shadow-md min-h-[11vh] h-auto dark:bg-black bg-white rounded-2xl drop-shadow shadow-lg">
        <div className="flex justify-between mx-4 items-center">
          <div className="flex items-center mt-2 relative max-[400px]:hidden">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-slate-100 dark:text-black rounded-3xl max-[620px]:min-w-[100px] min-w-[300px] sm:p-3 p-2"
            />
            <Search className="absolute text-black top-3 font-bold right-4 cursor-pointer" />
          </div>
          <div className="max-[400px]:justify-end max-[400px]:w-full flex gap-2 items-center">
            <AdminProfile />

            <div onClick={themeControl} className="cursor-pointer">
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
        </div>
      </div>
    </>
  );
};

export default Adminnavbar;

type SideBar = {
  id: number;
  label: string;
  link: string;
  icon: ReactElement;
}[];

export const sideBar: SideBar = [
  {
    id: 1,
    label: "dashboard",
    link: AdminUrl,
    icon: <IconDashboard />,
  },
  { id: 2, label: "users", link: `${AdminUrl}/users`, icon: <UserIcon /> },
  {
    id: 3,
    label: "blogers",
    link: `${AdminUrl}/bloggers`,
    icon: <BookAIcon />,
  },
  { id: 3, label: "posts", link: `${AdminUrl}/posts`, icon: <BookAIcon /> },
];

export const SideBarDisplay = () => {
  const Pathname = useLocation();

  return (
    <div className=" w-[90%] bg-transparent h-[65vh] flex flex-col justify-center align-middle text-center items-center mx-2 max-[250px]:mx-0 pl-3">
      {sideBar.map(({ id, label, icon, link }, index) => (
        <Link to={link} key={index} className="w-full">
          <div
            key={id}
            className={cn(
              "flex w-full capitalize gap-1 mt-5 cursor-pointer mb-3 bg- py-[14px] px-3 sm:rounded-3xl rounded-xl lg:pl-5 font-semibold bg-slate-100 text-black max-[380px]:px-0 max-[380px]:w-auto sm:bg-none sm:pl-2 pl-6 max-[380px]:pl-2 max-[280px]:pl-0",
              Pathname.pathname === link && "font-bold bg-black text-white"
            )}
          >
            {icon}
            <motion.p
              whileHover={{
                x: 6,
              }}
              transition={{
                duration: 0.1,
              }}
              className={clsx(
                "sm:block hidden",
                Pathname.pathname === link &&
                  "text-white dark:text-white max-[400px]:hidden font-bold ml-2"
              )}
            >
              {label}
            </motion.p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const AdminProfile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openlog, setOpenlog] = useState<boolean>(false);
  const { user, setUser }: any = UserAuth();
  // const { user, setUser }: any = {};

  const router = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCloselog = () => {
    setOpenlog(!openlog);
  };

  return (
    <>
      <div className={clsx("relative")}>
        <div
          className={clsx("flex gap-2 items-center cursor-pointer mt-1")}
          onClick={handleOpen}
        >
          <h1 className="font-semibold text-black dark:text-white">
            {user && user.firstName}
          </h1>
          <img
            className="size-12 rounded-full ring-1"
            src={user && user.imageUrl.url}
            alt={user && user.imageUrl.display_name}
            onClick={handleOpen}
          />
        </div>

        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-20"
          >
            <div className="w-44 absolute dark:text-black -right-2 h-20 bg-white drop-shadow-md rounded shadow mt-2 flex flex-col justify-center text-center">
              <Link to={`${AdminUrl}/admindeatils`} className="text-xl text-black text-center mt-1">
                Manage ProfIle
              </Link>
              <div className="mx-2 border my-2" />
              <button
                onClick={handleCloselog}
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
            duration: 1.2,
          }}
        >
          <div className="w-full text-black bg-black/20 h-[98vh] z-20 absolute m-0 top-0 left-0">
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


export const SideBarMenu = () =>{
  // return (

  // )
}