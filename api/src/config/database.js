import mongoose from "mongoose";

const dbConfig = {
  maxPoolSize: 10,
  minPoolSize: 2,
};

const database = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, dbConfig)
    .then(() => {
      console.log("DB Connection Successfull!");
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

export default database;
