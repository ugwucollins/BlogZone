import { useParams } from "react-router";
import Homenavbar from "../../navbar/Homenavbar";
import PostItems from "./PostItems";
import Footer from "../../footer/Footer";
import { usePost } from "../postsContext";
import { UserAuth } from "../../../content/usersContext";

const PostContent = () => {
  const { _id } = useParams();
  const { posts }: any = usePost();
  const { user }: any = UserAuth();

  const eachPost = posts.find((post: any) => post._id === _id && _id);
  const followers =
    eachPost &&
    eachPost.createdBy.followers.find((post: any) => post._id === user._id);

  return (
    <div>
      <Homenavbar />
      <div className="w-full flex justify-center text-left flex-col">
        <div className="mb-20 w-full relative min-h-screen">
          <PostItems id={_id} followers={followers} />
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
