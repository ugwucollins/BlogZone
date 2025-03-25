import { useParams } from "react-router";
import Footer from "../footer/Footer";
import Homenavbar from "../navbar/Homenavbar";
import PostCollection from "./PostCollection";

const Posts = () => {
  const { search } = useParams();

  return (
    <main className="w-full min-h-[100vh]">
      <Homenavbar />
      <PostCollection />
      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
};

export default Posts;
