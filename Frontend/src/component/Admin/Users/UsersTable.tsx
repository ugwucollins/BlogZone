import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GetTotalUsers } from "../AdminContext/UserAdminContext";
import moment from "moment";

const UsersTable = () => {
  const { AllUsers }: any = GetTotalUsers();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="overflow-x-auto bg-slate-200/90 dark:bg-neutral-900 rounded-2xl pb-9 pt-1 px-2">
        <table className="w-full relative">
          {/* head */}
          <thead className="shadow-md h-10 drop-shadow-xl w-full rounded-xl px-2 shadow-neutral-700 dark:shadow-neutral-600">
            <tr className="text-left font-medium">
              <th>
                <div className="ml-2 font-medium">Name</div>
              </th>
              <th className="font-medium">Email</th>
              <th className="font-medium">CreatedDate</th>
              <th className="font-medium">Role</th>
              <th></th>
            </tr>
          </thead>
          {AllUsers.map((user: any) => (
            <tbody key={user._id}>
              <tr className="top-5 mt-5">
                <td>
                  <div className="flex items-center gap-4 mt-5">
                    <div className="flex gap-1 flex-row">
                      <div className="object-cover size-12 dark:ring-2 dark:ring-slate-100 rounded-full">
                        <img
                          src={
                            user
                              ? user.imageUrl.url
                              : "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={user && user.imageUrl.display_name}
                          className="rounded-full w-[110px] h-[50px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.firstName + " " + " " + user.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mt-6 font-medium">{user.email}</div>
                </td>
                <td>
                  <div className="mt-6">
                    {moment(user.createdDate).format("MMM Do YYYY | h:mm")}
                  </div>
                </td>
                <td>
                  <div className="mt-5 capitalize">{user.role}</div>
                </td>

                <th>
                  <Link to={"userdetailS/" + user._id}>
                    <button className="hover:underline hover:font-bold font-medium transition-all duration-300 mt-5">
                      View
                    </button>
                  </Link>
                </th>
              </tr>
            </tbody>
          ))}
          <div className="absolute font-medium opacity-55 -bottom-8 right-[40%]">
            Table of UsersDetails
          </div>
        </table>
      </div>
    </motion.div>
  );
};

export const UserDetails = [
  {
    _id: 1,
    imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    firstName: "Hart ",
    lastName: "Hagerty",
    Email: "Zemlak, Daniel and Leannon",
    role: "admin",
    createdDate: "11,june,2004 .",
  },

  {
    _id: 2,
    imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    firstName: "Hart ",
    lastName: "Leannon",
    Email: "Zemlak, Daniel and Leannon",
    role: "user",
    createdDate: "11,june,2004 .",
  },
  {
    _id: 3,
    imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    firstName: "Hart ",
    lastName: "Leannon",
    Email: "Zemlak, Daniel and Leannon",
    role: "blogger",
    createdDate: "11,june,2004 .",
  },
];
``;
export default UsersTable;
