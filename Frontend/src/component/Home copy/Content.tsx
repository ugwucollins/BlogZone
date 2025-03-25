import { BookAIcon, User2Icon, UserPenIcon } from "lucide-react";
import { ReactElement } from "react";
import { LineChart } from "./LineChart";

const Content = () => {
  const CardItems: Card = [
    { icon: <User2Icon size={18} />, title: "Total user", legnth: 3000 },
    {
      icon: <UserPenIcon size={18} />,
      title: "Total users for Blog Content",
      legnth: 200,
    },
    {
      icon: <BookAIcon size={18} />,
      title: "Total Post for the BlogZone",
      legnth: 7000,
    },
  ];

  return (
    <div>
      <Cards CardItems={CardItems} />
    </div>
  );
};

export default Content;

type Card = {
  icon: ReactElement;
  title: string;
  legnth: number;
}[];

const Cards = ({ CardItems }: any) => {
  return (
    <div className="w-full mt-4 lg:mt-3">
      <div className="flex justify-center mb-4 md:justify-start flex-wrap flex-row gap-4 lg:gap-5 items-center w-full">
        {CardItems.map((CardItem: any) => (
          <div
            className="max-[396px]:w-full max-[396px]:min-w-full min-w-[310px] rounded-2xl shadow-slate-700 dark:shadow-neutral-300 drop-shadow-xl text-black shadow-md dark:text-white bg-white dark:bg-black/50 mb-2 py-5 px-2"
            key={CardItem.title}
          >
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
          </div>
        ))}
      </div>

      <div className=" px-3 m-1 mt-5 mb-0 min-h-[60vh] h-auto">
        <LineChart />
      </div>
    </div>
  );
};
