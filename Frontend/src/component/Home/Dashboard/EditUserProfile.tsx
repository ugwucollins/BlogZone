import { EditProfile } from "../../../data/EditProfile";
import Homenavbar from "../../navbar/Homenavbar";
import BackButton from "../../../data/BackButton";
import Footer from "../../footer/Footer";

const EditUserProfile = () => {
  return (
    <div className="w-full h-auto relative">
      <Homenavbar />
      <BackButton link="/UserProfile" className="mt-1" />
      <EditProfile />
      <Footer />
    </div>
  );
};

export default EditUserProfile;
