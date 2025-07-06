import mongoose from "mongoose";

const connectToDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(`Failed to connect to Mongodb`);
  }
};

export default connectToDb;
