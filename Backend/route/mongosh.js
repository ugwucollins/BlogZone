import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_CONNECT = process.env.MONGODB_CONNECT;

const MongodbConnecton = () => {
  return mongoose
    .connect(MONGODB_CONNECT)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => {
      console.log("Not Connected");
      console.log(err);
    });
};

export default MongodbConnecton;
