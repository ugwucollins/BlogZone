import { ButtonType } from "../content/Types";
import clsx from "clsx";

export const Button = ({
  title,
  Icon,
  className,
  style,
  onClick,
}: ButtonType) => {
  return (
    <div className={style} onClick={onClick}>
      <div className="w-full h-auto">
        <div
          className="
       relative h-[6vh] w-auto max-w-[100px] rounded-md flex justify-center text-center items-center font-semibold overflow-hidden before:absolute before:content-[''] before:w-full before:h-full before:rounded-md before:bg-black dark:before:bg-white dark:after:bg-black dark:text-white before:animate-spinSlow before:duration-[3s] after:absolute after:content-[''] after:w-[95%] after:h-[96%] after:bg-white after:rounded-lg
       
      "
        >
          <p
            className={clsx(
              "absolute top-0 hover:font-medium left-0 w-full h-full text-black z-10 text-center hover:bg-black hover:cursor-pointer hover:text-white gap-1 flex items-center justify-center hover:duration-500",
              className
            )}
          >
            {Icon}
            {title}
          </p>
        </div>
        {/* <div className="button">
        <p
          className={clsx(
            "absolute top-0 hover:font-medium left-0 w-full h-full text-black z-10 text-center hover:bg-black hover:cursor-pointer hover:text-white gap-1 flex items-center justify-center",
            className
          )}
        >
          {Icon}
          {title}
        </p>
      </div> */}
      </div>
    </div>
  );
};
