import { BookAIcon, User2Icon, UserPenIcon } from "lucide-react";
import { LineChart } from "./LineChart";
import { AdminUrl, Card } from "../../../content/Types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GetTotalUsers } from "../AdminContext/UserAdminContext";
import { usePost } from "../../Posts/postsContext";
import { CardsVartiant } from "../../ui/apple-cards-carousel";

const Content = () => {
  const { AllUsers }: any = GetTotalUsers();
  const role = "bloggers";
  const TotalBloggers = AllUsers.filter((user: any) => user.role === role);
  const { posts }: any = usePost();

  const CardItems: Card = [
    {
      icon: <User2Icon size={18} />,
      title: "Total user",
      legnth: AllUsers.length,
      link: `${AdminUrl}/users`,
    },
    {
      icon: <UserPenIcon size={18} />,
      title: "Total users for Blog Content",
      legnth: TotalBloggers.length,
      link: `${AdminUrl}/bloggers`,
    },
    {
      icon: <BookAIcon size={18} />,
      title: "Total Post for the BlogZone",
      legnth: posts.length,
      link: `${AdminUrl}/posts`,
    },
  ];

  return (
    <div className="z-0">
      <Cards CardItems={CardItems} />
    </div>
  );
};

export default Content;

const Cards = ({ CardItems }: any) => {
  return (
    <div className="w-full mt-4 lg:mt-3">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, delayChildren: 0.1 }}
      >
        <div className="flex justify-center mb-4 lg:justify-start flex-wrap flex-row gap-4 lg:gap-5 items-center w-full max-[825px]:justify-center">
          {CardItems.map((CardItem: any, index: any) => (
            <motion.div
              variants={CardsVartiant(index, 0.6)}
              whileInView={"show"}
              initial="hidden"
              viewport={{ once: false, amount: 0.25 }}
              className="max-[396px]:w-full max-[396px]:min-w-full min-w-[310px] rounded-2xl shadow-slate-700 dark:shadow-neutral-300 drop-shadow-xl text-black shadow-md dark:text-white bg-white dark:bg-black/50 mb-2 py-5 px-2"
              key={CardItem.title}
            >
              <Link to={CardItem.link}>
                <div className="flex gap-1 items-center">
                  <h1 className="ml-1 w-auto rounded-full text-black bg-neutral-200 p-2">
                    {CardItem.icon}
                  </h1>
                  <span className=" capitalize font-medium dark:text-white">
                    {CardItem.title}
                  </span>
                </div>
                <p className="w-full text-right -ml-2 mb-0 mt-5 font-semibold">
                  {CardItem.legnth}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className=" px-3 m-1 mt-5 mb-0 min-h-[60vh] h-auto">
        <LineChart />
      </div>
    </div>
  );
};
