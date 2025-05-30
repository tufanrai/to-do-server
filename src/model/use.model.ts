import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
    },
    password: {
      type: String,
      required: [true, "please enter your passsword"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
