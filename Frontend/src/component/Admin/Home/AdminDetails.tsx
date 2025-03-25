import { motion } from "framer-motion";
import {
  BottomGradient,
  Label,
  LabelInputContainer,
} from "../../auth/Login/LoginForm";
import { Input } from "../../auth/SignUp/input";
import Footer from "../../footer/Footer";
import Adminnavbar from "../../navbar/Adminnavbar";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../../../content/usersContext";
import { VailationSignUp } from "../../../content/FormVaildation";
import Api, { PHOTO_URL } from "../../../Axios/Api";
import { toast } from "react-toastify";
import { BlogZoneLoader } from "../../../content/loading";

const AdminDetails = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="fixed max-lg:w-[97%] w-[99%] z-10">
        <Adminnavbar />
      </div>
      <div className="w-full min-h-screen mt-28 z-0 text-black dark:text-white">
        <div className="ml-[21%] overflow-hidden">
          <AdminDetailsOne />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;

export const AdminDetailsOne = () => {
  const [formerr, setformerr] = useState<any>({});
  const router = useNavigate();
  const { user }: any = UserAuth();

  const [firstName, setfirstName] = useState(user && user.firstName);
  const [lastName, setlastName] = useState(user && user.lastName);
  const [email, setemail] = useState(user && user.email);
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [imageUrl, setimageUrl] = useState({
    file: user && user.imageUrl,
    url: user && user.imageUrl.url,
  });
  const { VITE_REACT_CLOUD_NAME, VITE_REACT_UPLOAD_PRESET_NAME } = import.meta
    .env;

  const handleimgUrl = async (event: any) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", `${VITE_REACT_UPLOAD_PRESET_NAME}`);
    data.append("cloud_name", `${VITE_REACT_CLOUD_NAME}`);
    if (!file) return;

    try {
      setloading(true);
      const res = await fetch(PHOTO_URL, {
        method: "POST",
        body: data,
      });
      const uploadedImage = await res.json();
      console.log(uploadedImage);
      setimageUrl({
        file: uploadedImage,
        url: uploadedImage.url,
      });
      setloading(false);
    } catch (error: any) {
      toast.error(`${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const data = {
      email,
      firstName,
      lastName,
      imageUrl: imageUrl.url,
      password,
    };
    const id = user._id;
    console.log(id);

    const isVaild = VailationSignUp(
      email,
      firstName,
      lastName,
      setformerr,
      password
    );
    if (!isVaild) {
      console.log("hh");
    } else {
      try {
        const res = await Api.put(`/users/${id}`, data);
        const userData = res.data;

        if (userData.success) {
          console.log(userData);
          const alert = () => toast.success(userData.message);
          alert();
          setTimeout(() => {
            router("/UserProfile");
          }, 1000);
        } else {
          console.log(userData);
          const alert = () => toast.error(userData.message);
          alert();
          router("/EditUserProfile");
        }
      } catch (error: any) {
        const alert = () => toast.error(error.response.data.message);
        alert();
      }
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="md:max-w-[600px] max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Edit Profile
        </h2>

        <form className="mt-6 mb-2" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-3">
            <Label
              htmlFor="file"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              {loading ? (
                <BlogZoneLoader />
              ) : (
                <img
                  src={imageUrl.url}
                  alt={firstName}
                  className="size-36 rounded-full ring-1 mb-2"
                />
              )}
              <h1 className="font-semibold">Edit Photo</h1>
              {formerr.imageUrl && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.imageUrl}{" "}
                </span>
              )}
            </Label>

            <Input
              id="file"
              placeholder="projectmayhem@fc.com"
              type="file"
              className="hidden"
              onChange={handleimgUrl}
            />
          </LabelInputContainer>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                type="text"
              />
              {formerr.firstName && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.firstName}{" "}
                </span>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Durden"
                type="text"
              />
              {formerr.lastName && (
                <span className="text-red-700/75 mb-2 font-medium capitalize">
                  {" "}
                  {formerr.lastName}{" "}
                </span>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
            {formerr.email && (
              <span className="text-red-700/75 mb-2 font-medium capitalize">
                {" "}
                {formerr.email}{" "}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="••••••••"
              type="password"
            />
            {formerr.password && (
              <span className="text-red-700/75 mb-2 font-medium capitalize">
                {" "}
                {formerr.password}{" "}
              </span>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-50 dark:to-zinc-500 to-neutral-600 block dark:bg-zinc-800 w-full text-white dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Edit Profile &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </motion.div>
  );
};
