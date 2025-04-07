import axios from "axios";

// const Url = "https://mern-project-422f.vercel.app/api";
const { VITE_REACT_CLOUD_NAME } = import.meta.env;

const Api = axios.create({
  baseURL: "https://vercel.com/movie-lands-projects/blog-zone-api/api/auth",
});

export default Api;
export const PHOTO_URL = `https://api.cloudinary.com/v1_1/${VITE_REACT_CLOUD_NAME}/image/upload`;
