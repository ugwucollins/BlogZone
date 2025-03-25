import { Puff } from "react-loading-icons";
import { cn } from "../lib/utils";
//98ff98

const Loading = () => {
  return (
    <section className="flex_center h-screen mt-[260px]">
      <Puff stroke="gray" speed={0.5} width={120} height={120} />
    </section>
  );
};

export default Loading;
type loader = {
  className?: string;
};
export const BlogZoneLoader = ({ className }: loader) => {
  return (
    <div className={cn(className)}>
      <div className="w-full relative flex justify-center rounded-full animate-pulse align-middle text-center items-center">
        <div className=" absolute size-[110px] rounded-full bg-black/30 dark:bg-white/80" />
        <img
          src="/logo.png"
          alt="Blogzone logo"
          className="w-[110px] h-[100px] rounded-full  animate-bounce"
        />
      </div>
    </div>
  );
};
