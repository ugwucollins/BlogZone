import Footer from "../../component/footer/Footer";
import Adminnavbar from "../../component/navbar/Adminnavbar";
import Content from "./Content";

const Dashboard = () => {
  return (
    <div className="w-full sm:overflow-auto overflow-hidden">
      <div className="w-full min-h-[90vh] mb-2 text-black dark:text-white">
        <Adminnavbar />
        <div className="ml-[21%] overflow-hidden">
          <Content />
        </div>
      </div>
      <div className="w-auto ml-[20%] overflow-hidden min-w-fit">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
