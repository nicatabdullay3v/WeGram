const Users = require("./../models/usersModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// Login Jwt -=--=-=-=-=-=-=-==
const login = async (req, res) => {
  try {
    const findUser = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (findUser) {
      const token = jwt.sign({ findUser }, "1233", {
        expiresIn: "1h",
      });
      res.status(200).send({ message: token });
    } else {
      res.status(201).send({ message: "bele acc yoxdu" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
// PatchPosts--=-==-=-==--==--=---=
const patchPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const updateFields = req.body;
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const postIndex = user.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).send({ error: "Post not found" });
    }
    user.posts[postIndex] = { ...user.posts[postIndex], ...updateFields };
    await user.save();

    res.status(200).send({ message: "Post patched" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// getPosts=-=-=-=---=-=-

const getPostById = async (req, res) => {
  try {
    const userId = req.params.id; 
    const postId = req.params.postId; 

    const user = await Users.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const post = user.posts.find((p) => p.id === postId);

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// addPost--==-==-=-=-=-=-=-=-

const addPostImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const { filename } = req.file;
    const { title, id, time, likes, comments } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $push: {
          posts: {
            img: `images/${filename}`,
            id: id || uuidv4(),
            title: title || "Default Title",
            time: time || new Date(),
            likes: JSON.parse(likes) || [],
            comments: comments || [],
          },
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// getAllData=-=-=--=-=-=--=-=-=-=
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

// PostUsers =-=--=-=-=-=-=-=-=-=--=-=-
const postUsers = async (req, res) => {
  try {
    const findUser = await Users.findOne({ email: req.body.email });

    if (findUser) {
      res.status(201).send({ message: "Bele acc var" });
    } else {
      const newUser = new Users(req.body);
      newUser.save();
      res.status(200).send({ message: "User posted" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
// PatchUsers==-=-=-=-=-=-=-=-=-=-==-=
const patchUsers = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const patchedUsers = await Users.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).send({ message: "User patched" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
// exports-=-=-==-=-=-=-
module.exports = {
  getAllUsers,
  postUsers,
  patchUsers,
  login,
  addPostImage,
  getPostById,
  patchPost
};
