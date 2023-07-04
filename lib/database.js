import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.DATABASE;
  const client = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected!");
};

export default connectDB;
