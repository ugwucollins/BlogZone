import Adminnavbar from "../../navbar/Adminnavbar";
import Footer from "../../footer/Footer";
import BloggersTable from "./BloggersTable";

const Bloggers = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="fixed max-lg:w-[97%] w-[99%] z-10">
        <Adminnavbar />
      </div>
      <div className="w-full min-h-screen mt-28 text-black dark:text-white">
        <div className="ml-[21%] overflow-hidden">
          <BloggersTable />
          <div className="mt-32">
           <Footer />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Bloggers;
