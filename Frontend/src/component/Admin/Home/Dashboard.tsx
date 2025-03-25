import Footer from "../../footer/Footer";
import Adminnavbar from "../../navbar/Adminnavbar";
import Content from "./Content";

const Dashboard = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="fixed max-lg:w-[97%] w-[99%] z-10">
        <Adminnavbar />
      </div>
      <div className="w-full min-h-screen mt-28 z-0 text-black dark:text-white">
        <div className="ml-[21%] overflow-hidden">
          <Content />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
