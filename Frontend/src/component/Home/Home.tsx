import { AnimatedTestimonialsData } from "../../data/AnimatedTestimonialsData";
import Footer from "../footer/Footer";
import { TextRevealCardPreview } from "../footer/FooterCard/TextRevealCardPreview";
import Homenavbar from "../navbar/Homenavbar";
import PostCollection from "../Posts/PostCollection";

const Home = () => {
  return (
    <div className="w-full min-h-[97vh] overflow-hidden h-auto bg-white dark:bg-black">
      <div className="fixed w-full mb-10 z-30 ">
        <Homenavbar />
      </div>
      <div className="w-full mt-20 z-0">
        <AnimatedTestimonialsData />
        <PostCollection />
        <TextRevealCardPreview />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
