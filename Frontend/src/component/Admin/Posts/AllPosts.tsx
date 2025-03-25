// import React from "react";
import Adminnavbar from "../../navbar/Adminnavbar";
import Footer from "../../footer/Footer";
import PostList from "./PostList";

const AllPosts = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="fixed max-lg:w-[97%] w-[99%] z-10">
        <Adminnavbar />
      </div>
      <div className="w-full mt-24 min-h-screen mb-2 text-black dark:text-white">
        <div className="ml-[21%] overflow-hidden">
          <div className="mb-10">
            <PostList />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
