import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter the task to do"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, "user id is required to identify the task of the user"],
    ref: "users",
  },
});

const ToDoList = mongoose.model("todo", listSchema);
export default ToDoList;
