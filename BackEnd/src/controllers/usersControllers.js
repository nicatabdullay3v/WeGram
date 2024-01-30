const Users = require("./../models/usersModel");
const jwt = require("jsonwebtoken");

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
};
