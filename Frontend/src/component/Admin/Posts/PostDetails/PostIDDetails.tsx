import { useParams } from "react-router";
import Footer from "../../../footer/Footer";
import PostDetailsList from "./PostDetailsList";
import Adminnavbar from "../../../navbar/Adminnavbar";

import { usePost } from "../../../Posts/postsContext";
import { UserAuth } from "../../../../content/usersContext";

const PostIDDetails = () => {
  const { _id } = useParams();
  const { posts }: any = usePost();
  const { user }: any = UserAuth();

  const eachPost = posts.find((post: any) => post._id === _id && _id);
  const Likes =
    eachPost && eachPost.likes.find((post: any) => post._id === user._id);
  const followers =
    eachPost &&
    eachPost.createdBy.followers.find((post: any) => post._id === user._id);

  return (
    <div className="w-full overflow-hidden">
      <div className="fixed max-lg:w-[97%] w-[99%] z-10">
        <Adminnavbar />
      </div>
      <div className="w-full mt-24 min-h-screen mb-2 text-black dark:text-white">
        <div className="ml-[21%] overflow-hidden">
          <div className="mb-10">
            <PostDetailsList id={_id} Likes={Likes} followers={followers} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIDDetails;
