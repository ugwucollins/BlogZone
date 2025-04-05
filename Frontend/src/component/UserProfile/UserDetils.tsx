import { motion } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserAuth } from "../../content/usersContext";
import BackButton from "../../data/BackButton";

const UserDetils = () => {
  const { user }: any = UserAuth();
  const date = user && user.createdDate;
  // const date = moment(user.createdDate).format("MMMM Do YYYY, h:mma");

  return (
    <>
      <BackButton link="/Dashboard" className="mt-4" />
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
        className=" mt-[10vh] relative"
      >
        <div className="md:max-w-[600px] max-w-lg w-full mx-auto md:rounded-2xl drop-shadow-lg p-4 md:p-8 shadow-md bg-white dark:bg-black rounded-xl">
          <div className="flex justify-center w-full">
            <img
              src={user && user.imageUrl.url}
              alt={user && user.imageUrl.display_name}
              className="size-40 ring-2 ring-gray-400 rounded-full mb-1"
            />
          </div>

          <div className="flex gap-2 justify-evenly mt-3 mb-2 text-black dark:text-white">
            <div className="w-[80%] justify-end text-neutral-700 dark:text-neutral-300/90  flex flex-col text-end">
              <p className="text-neutral-700 dark:text-neutral-300/90 mb-3">
                FirstName:
              </p>
              <p className=" mb-2">LastName:</p>
              <p className="">Email:</p>
              <p className="">
                {user && user.followers.length <= 1
                  ? "Follower:"
                  : "Followers:"}
              </p>
              <p className=" mt-2">Role:</p>
              <p className=" mt-2">Create Post:</p>
              <p className=" mt-2">CreatedDate:</p>
            </div>

            <div className="justify-start w-full ml-2">
              <div className="mb-1">
                <p className="text-lg font-normal capitalize">
                  {user && user.firstName}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>

              <div className="mb-1">
                <p className="text-lg font-normal capitalize">
                  {user && user.lastName}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>

              <div className="">
                <p className="text-lg font-normal">{user && user.email}</p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>
              <div className="">
                <p className="text-lg font-normal">
                  {user && user.followers.length}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>

              <div className="">
                <p className="text-lg font-normal capitalize">
                  {user && user.role}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>

              <div className="">
                <p className="text-lg font-normal capitalize">
                  {user ? (user.role === "user" ? "No" : "Yes") : "null"}
                  {/* {user.role === "user" ? "No" : "Yes"} */}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>

              <div className="">
                <p className="mt-1 font-normal text-neutral-500 capitalize">
                  {moment(date).format("MMMM Do YYYY, h:mma")}
                </p>
                <div className="mx-1 border border-gray-300 w-[95%]" />
              </div>
            </div>
          </div>

          <Link to={`/UserProfile/EditUserProfile`}>
            <button className="flex justify-center text-center  rounded-xl mt-4 mb-1 bg-black dark:bg-slate-100  p-2 w-full">
              <p className="font-semibold dark:text-black text-white w-full hover:animate-pulse">
                Edit Profile
              </p>
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default UserDetils;
