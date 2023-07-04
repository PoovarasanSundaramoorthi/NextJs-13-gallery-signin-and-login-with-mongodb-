import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  token: String,
});

export default mongoose.models.User || mongoose.model("User", UsersSchema);
