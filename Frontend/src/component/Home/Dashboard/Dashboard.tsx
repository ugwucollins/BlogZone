import Footer from "../../footer/Footer";
import Homenavbar from "../../navbar/Homenavbar";
import PostCollection from "../../Posts/PostCollection";
import { AppleCardsCarouselDemo } from "./AppleCardsCarousel";

const Dashboard = () => {
  return (
    <div className="w-full min-h-[97vh]">
      <Homenavbar />
      <AppleCardsCarouselDemo />
      <PostCollection />
      <Footer />
    </div>
  );
};

export default Dashboard;
