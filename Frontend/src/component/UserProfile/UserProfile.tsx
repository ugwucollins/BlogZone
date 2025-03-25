import Footer from "../footer/Footer";
import Homenavbar from "../navbar/Homenavbar";
import UserDetils from "./UserDetils";

const UserProfile = () => {
  return (
    <div className="w-full min-h-[97vh]">
      <Homenavbar />
      <UserDetils />
      <Footer />
    </div>
  );
};

export default UserProfile;
