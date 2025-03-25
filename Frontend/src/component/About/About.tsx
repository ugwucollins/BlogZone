import Footer from "../footer/Footer";
import Homenavbar from "../navbar/Homenavbar";
import Content from "./Content";

const About = () => {
  return (
    <>
      <div className="w-full">
        <Homenavbar />
        <Content />
      </div>
      <Footer />
    </>
  );
};

export default About;
