import mongoose from "mongoose";

const connection = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("db connection established");
  } catch (error) {
    console.log(`Error while connecting to Database ${error}`);
  }
};
export default connection;
