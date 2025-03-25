// import React from 'react'
import { useParams } from "react-router";
import { Link } from "react-router-dom";
type Posts = {
  _id: string;
  name: string;
  titles: string;
  body: string;
  date: string;
};

interface Props {
  posts: any;
  deleteHandle: any;
}

const Edit = ({ posts, deleteHandle }: Props) => {
  const { _id } = useParams<Posts>();
  const blog = posts.find((post: any) => post._id === _id);
  console.log({ blogName: blog.name });

  return (
    <section className="h-screen relative justify-between bg-slate-300/70 p-2 rounded drop-shadow-xl">
      <div>
        <div className="font-semibold text-xl mb-1">
          {blog.name ? blog.name : blog.name} Page
        </div>
        <div className="flex gap-2">
          <p className="font-semibold text-lg ">Title: </p>
          <div className="font-normal text-lg underline cursor-pointer mb-2">
            {blog.titles}
          </div>
        </div>
        <div className="mb-3">{blog.body}</div>
        <div className="text-black/70">{blog.date}</div>

        <div className="flex gap-2 mt-2 mb-2">
          <Link to={`/editById/${blog._id}`}>
            <button className="cursor-pointer w-[120px] p-2 rounded-md  drop-shadow-2xl  shadow-lg shadow-white/70 text-white h-[40px] bg-slate-400 hover:bg-slate-500 transition font-bold">
              Edit
            </button>
          </Link>
          <button
            onClick={() => deleteHandle(blog._id)}
            className="cursor-pointer w-[120px] p-2 rounded-md font-bold drop-shadow-2xl bg-red-700 shadow-lg shadow-white/70 text-white h-[40px]  hover:bg-red-800 transition "
          >
            Delete
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="font-semibold hover:underline transition text-black/80 cursor-pointer absolute right-2 top-3"
      >
        Back To Home
      </Link>
    </section>
  );
};

export default Edit;
