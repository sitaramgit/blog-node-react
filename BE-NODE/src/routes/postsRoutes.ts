import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/postsController";
import multer from "multer";
import fileUpload from "../common/fileUpload";

const router = Router();
// Configure multer for single coverImage upload
router.post('/create-post', fileUpload.single('coverImage'), createPost);
router.get('/get-all-posts', getAllPosts);

export default router;