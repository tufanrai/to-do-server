import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "please enter your full name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    min: [6, "your password must have at least 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);
export default User;
