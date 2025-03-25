import { navbarMenus, sidebarMenus, SocialIcons } from "./Types";
import {
  House,
  UserRoundPen,
  BookMarked,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";
import { UserAuth } from "./usersContext";
// import { SidebarLink } from "../component/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import { IconBrandTiktok } from "@tabler/icons-react";
import { FloatingDockDemo } from "../component/footer/FloatingDockDemo";
import { IconBrandGithub, IconBrandX, IconExchange } from "@tabler/icons-react";
import { FloatingDock } from "../component/ui/floating-dock";

export const NavMenu = () => {
  const { user, setrouterPath }: any = UserAuth();
  const NavMenus: navbarMenus = [
    {
      id: 1,
      text: `${user ? "Dashboard" : "Home"}`,
      path: `${user ? "/Dashboard" : "/"}`,
    },
    { id: 2, text: "About", path: "/About" },
    { id: 3, text: " Post", path: "/posts" },
  ];
  const pathName = useLocation();

  return (
    <>
      <div className="flex gap-2 items-center">
        {NavMenus.map(({ text, path, id }) => (
          <div key={id} className="cursor-pointer mb-10 mt-9">
            <Link
              to={path}
              className={clsx(
                "m-1 dark:text-white py-3",
                pathName.pathname === path &&
                  "bg-black/5 p-2 rounded-md text-black dark:text-white font-semibold animate-pulse"
              )}
              onClick={() => {
                setrouterPath(path);
                localStorage.setItem("routerPath", path);
              }}
            >
              {text}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export const Links = () => {
  const { user, setrouterPath }: any = UserAuth();
  const pathname = useLocation();

  const links: sidebarMenus = [
    {
      label: `${user ? "Dashboard" : "Home"}`,
      href: `${user ? "/Dashboard" : "/"}`,
      icon: <House />,
    },
    {
      label: "About",
      href: "/about",
      icon: <UserRoundPen />,
    },
    {
      label: "Post",
      href: "/posts",
      icon: <BookMarked />,
    },
  ];

  return (
    <div>
      {links.map((link, idx) => (
        <Link to={link.href} key={idx}>
          <div
            key={idx}
            className={clsx(
              "flex text-black/90 dark:text-white/70 gap-2 mt-10 cursor-pointer mb-5 ",
              pathname.pathname === link.href &&
                "text-black dark:text-white font-bold"
            )}
            onClick={() => {
              setrouterPath(link.href);
              localStorage.setItem("routerPath", link.href);
            }}
          >
            {link.icon}
            <motion.p
              whileHover={{
                x: 6,
              }}
              transition={{
                duration: 0.1,
              }}
              className={clsx(
                pathname.pathname === link.href &&
                  "text-black dark:text-white font-bold"
              )}
            >
              {link.label}
            </motion.p>
          </div>
        </Link>
      ))}
    </div>
  );
};

// footer Links
export const footerLinks = [
  { label: "About", text: "About" },
  { label: "About Us", text: "About Us" },
  { label: "Blog", text: "Blog" },
  { label: "Career", text: "Career" },
];

export const footerLinks2 = [
  { label: "Support", text: "Support" },
  { label: "Contact Us", text: "Contact Us" },
  { label: "Return", text: "Return" },
  { label: "FAQ", text: "FAQ" },
];

export const SocialHands = () => {
  const socialHands: SocialIcons = [
    {
      id: 1,
      icon: <InstagramIcon />,
      path: "",
    },
    { id: 2, icon: <TwitterIcon />, path: "" },
    { id: 3, icon: <FacebookIcon />, path: "" },
    { id: 4, icon: <IconBrandTiktok />, path: "" },
  ];

  return (
    <>
      <div className="flex gap-x-4 gap-y-1 max-[310px]:justify-center sm:justify-end flex-wrap sm:flex-nowrap justify-start">
        {socialHands.map(({ icon, id }) => (
          <div key={id} className="cursor-pointer">
            <div
              className={clsx(
                "p-4 mt-8 text-white bg-gray-700 rounded-full animate"
              )}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
      <FloatingDockDemo />
    </>
  );
};

export const ScoialLinks = () => {
  const links = [
    {
      title: "Instagram",
      icon: (
        <InstagramIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Facebook",
      icon: (
        <FacebookIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[12rem] w-full">
      <FloatingDock items={links} />
    </div>
  );
};
