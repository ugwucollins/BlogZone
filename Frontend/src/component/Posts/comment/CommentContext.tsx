export type Comments = {
  id: number;
  text: string;
  ImageUrl: string;
}[];

export const createCommentFun = (
  imageUrl: any,
  text: string,
  comment: any,
  setcomment: any
) => {
  if (text === "" || imageUrl === "") {
    const error = "Input is required";
    toast.error(error);
    return console.log("error");
  }
  console.log("Done");
  const message = "Comment added successfully";
  toast.success(message);
  const id = Date.now();
  const newComment = { id: id, text: text, imageUrl: imageUrl.url };
  const commentList = [...comment, newComment];
  setcomment(commentList);
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import Api from "../../../Axios/Api";

export const commentCreateContext = createContext({});

export const CommentContext = ({ children }: { children: ReactNode }) => {
  const [comment, setcomment] = useState([]);

  // comments
  const fetchUComments = async () => {
    try {
      const res = await Api.get(`/comments`);
      const data = res.data;
      setcomment(data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUComments();
  }, []);

  return (
    <commentCreateContext.Provider value={{ comment, setcomment }}>
      {children}
    </commentCreateContext.Provider>
  );
};

export const useComment = () => {
  return useContext(commentCreateContext);
};
