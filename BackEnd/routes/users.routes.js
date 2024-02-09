import express from "express"
import protectRoute from "../middleware/protetcRoute.js"
import { addPostImage, getCommentById, getPostById, getUsers, getUsersById, patchComments, patchPost, patchUsers } from "../controllers/users.controller.js"
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


router.get("/",protectRoute,getUsers)
router.get("/:id",protectRoute,getUsersById)
router.patch("/:id",protectRoute,patchUsers)
router.patch('/:id/addPostImage',protectRoute, upload.single('file'),addPostImage );
router.get("/:id/posts/:postId",protectRoute, getPostById);
router.get("/:id/posts/:postId/comments/:commentId",protectRoute, getCommentById);
router.patch("/:id/posts/:postId/comments/:commentId",protectRoute, patchComments);
router.patch("/:id/posts/:postId",protectRoute, patchPost);

export default router