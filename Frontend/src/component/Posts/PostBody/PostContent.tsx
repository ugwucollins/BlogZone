import { useParams } from "react-router";
import Homenavbar from "../../navbar/Homenavbar";
import PostItems from "./PostItems";
import Footer from "../../footer/Footer";

const PostContent = () => {
  const { _id } = useParams();
  return (
    <>
      <Homenavbar />
      <div className="w-full">
        <div className="mb-20 w-full">
          <PostItems id={_id} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostContent;
