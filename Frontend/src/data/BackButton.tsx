import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
type BackButton = {
  link: string;
  className?: string;
};

const BackButton = ({ link, className }: BackButton) => {
  return (
    <Link to={link}>
      <button
        className={clsx(
          className,
          "absolute top-20 left-4 bg-black text-white rounded-md px-2 py-1"
        )}
      >
        <p className="flex items-center w-full hover:animate-pulse hover:font-medium">
          <ArrowLeft size={20} /> Back
        </p>
      </button>
    </Link>
  );
};

export default BackButton;
