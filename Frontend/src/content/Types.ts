import { ReactElement } from "react";

export type navbarMenus = {
  id: number;
  text: string;
  path: string;
  icon?: ReactElement;
}[];

export type sidebarMenus = {
  label: string;
  href: string;
  icon?: ReactElement;
}[];

export type Post = {
  title: string;
  imageUrl: string;
  createdDate: string;
  postMessage: string;
  categorate: string;
  createdBy: {
    imageUrl: string;
    createdDate: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  _id: string;
};

export type ButtonType = {
  title: string;
  className?: string;
  style?: string;
  Icon: ReactElement;
  onClick?:() => void;
};

export type SocialIcons = {
  id: number;
  icon: ReactElement;
  path: string;
}[];

export const AdminUrl: any = import.meta.env.VITE_REACT_APP_ADMIN_URL;

export type Card = {
  icon: ReactElement;
  title: string;
  link: string;
  legnth: number;
}[];
