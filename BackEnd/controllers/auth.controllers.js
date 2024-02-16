import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const {
      password,
      fullname,
      surname,
      confirmPassword,
      gender,
      email,
      username,
    } = req.body;

    if (password != confirmPassword) {
      console.log("sads");

      return res.status(400).json({ error: "Password dont'n match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // https://avatar.iran.liara.run/
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const newUser = new User({
      username,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
      surname,
      fullname,
      password: hashedPassword,
      email,
      gender,
      isPublic: "true",
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
      email: user.email,
      Admin: user.Admin,
    });
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
