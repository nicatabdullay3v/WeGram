import express from "express"
import protectRoute from "../middleware/protetcRoute.js"
import { addPostImage, addProfilePicture, addStory, deleteCommentById, deletePostById, deleteStoryById, deleteUserById, getCommentById, getPostById, getUsers, getUsersById, patchComments, patchPost, patchUsers } from "../controllers/users.controller.js"
import multer from "multer"
import path from "path"
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
  });
  const storyStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/stories/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const storyUpload = multer({
    storage: storyStorage,
  });

  const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/profilePictures/");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  const profilePictureUpload = multer({
    storage: profilePictureStorage,
  });

router.get("/",protectRoute,getUsers)
router.get("/:id",protectRoute,getUsersById)
router.delete("/:id",protectRoute,deleteUserById)
router.patch("/:id",protectRoute,patchUsers)
router.patch('/:id/addPostImage',protectRoute, upload.single('file'),addPostImage );
router.patch('/:id/addStory', protectRoute, storyUpload.single('file'), addStory);
router.patch('/:id/addProfilePicture', protectRoute, profilePictureUpload.single('file'), addProfilePicture);
router.get("/:id/posts/:postId",protectRoute, getPostById);
router.get("/:id/posts/:postId/comments/:commentId",protectRoute, getCommentById);
router.delete("/:id/posts/:postId/comments/:commentId",protectRoute, deleteCommentById);
router.patch("/:id/posts/:postId/comments/:commentId",protectRoute, patchComments);
router.patch("/:id/posts/:postId",protectRoute, patchPost);
router.delete('/:id/stories/:storyId', deleteStoryById);
router.delete("/:id/posts/:postId",protectRoute, deletePostById);

export default router