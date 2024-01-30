const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    username: String,
    img: String,
    followers: Array,
    followings: Array,
    surname: String,
    name: String,
    blockList: Array,
    stories: Array,
    notifications: Array,
    password: String,
    bio: Array,
    isPublic: Boolean,
    posts: Array,
    email: String,
    requests: Array,
  },
  { collection: "Users" }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
