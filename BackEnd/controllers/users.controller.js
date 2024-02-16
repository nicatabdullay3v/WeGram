import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
export const getUsersById = async (req, res) => {
  try {
    console.log(req.params.id);
    const UserByID = await User.findOne({ _id: req.params.id }).select(
      "-password"
    );
    return res.status(200).json(UserByID);
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    const UserByID = await User.deleteOne({ _id: req.params.id });
    return res.status(200).json(UserByID);
  } catch (error) {
    res.status(500).json({ error: "Iternal Server Error" });
  }
};
export const patchUsers = async (req, res) => {
  try {
    console.log(req.params.id);

    console.log(req.body);
    const id = req.params.id;
    const patchedUsers = await User.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).send({ message: "User patched" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export const patchPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const updateFields = req.body;
    const user = await User.findOne({ _id: userId });
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

export const addPostImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const { filename } = req.file;
    const { title, id, time, likes, comments } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
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
export const addStory = async (req, res) => {
  try {
    const userId = req.params.id;
    const { filename } = req.file;
    const { title, id, time } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          stories: {
            img: `stories/${filename}`,
            id: id || uuidv4(),
            title: title || "Default Title",
            time: time || new Date(),
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
export const getPostById = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;

    const user = await User.findOne({ _id: userId });

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

export const deletePostById = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const postIndex = user.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).send({ error: "Post not found" });
    }

    // Remove the post from the user's posts array
    user.posts.splice(postIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).send({ message: "Post deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Comments=-=-=-===-=
export const getCommentById = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const post = user.posts.find((p) => p.id === postId);
    const comment = post.comments.find((x) => x.commentID == commentId);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    console.log(comment);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
export const deleteCommentById = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const postIndex = user.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).send({ error: "Post not found" });
    }

    const commentIndex = user.posts[postIndex].comments.findIndex(
      (c) => c.commentID === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({ error: "Comment not found" });
    }

    user.posts[postIndex].comments.splice(commentIndex, 1);

    await user.save();

    res.status(200).send({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const patchComments = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const updateFields = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.error("User not found");
      return res.status(404).send({ error: "User not found" });
    }

    const postIndex = user.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      console.error("Post not found");
      return res.status(404).send({ error: "Post not found" });
    }

    const commentIndex = user.posts[postIndex].comments.findIndex(
      (c) => c.commentID === commentId
    );

    if (commentIndex === -1) {
      console.error("Comment not found");
      return res.status(404).send({ error: "Comment not found" });
    }

    console.log(
      "Updating comment:",
      user.posts[postIndex].comments[commentIndex]
    );
    await User.findByIdAndUpdate(userId, {
      $set: {
        [`posts.${postIndex}.comments.${commentIndex}`]: updateFields,
      },
    });

    console.log(
      "Updated comment:",
      user.posts[postIndex].comments[commentIndex]
    );

    await user.save();

    console.log("Save successful");

    res.status(200).send({ message: "Comment patched" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
export const deleteStoryById = async (req, res) => {
  try {
    const userId = req.params.id;
    const storyId = req.params.storyId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const storyIndex = user.stories.findIndex((s) => s.id === storyId);

    if (storyIndex === -1) {
      return res.status(404).send({ error: "Story not found" });
    }

    user.stories.splice(storyIndex, 1);

    await user.save();

    res.status(200).send({ message: "Story deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

