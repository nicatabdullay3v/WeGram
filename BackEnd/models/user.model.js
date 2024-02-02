import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: String,
    profilePicture: String,
    followers: Array,
    followings: Array,
    surname: String,
    fullname: String,
    gender: String,
    blockList: Array,
    stories: Array,
    notifications: Array,
    password: String,
    confirmPassword: String,
    bio: Array,
    isPublic: Boolean,
    posts: Array,
    email: String,
    requests: Array,
  },
  {timestamps: true }
);

const User = mongoose.model("User", usersSchema);
export default User;
