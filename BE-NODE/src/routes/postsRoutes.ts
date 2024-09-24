import { Router } from "express";
import { createPost } from "../controllers/postsController";
import multer from "multer";
import fileUpload from "../common/fileUpload";

const router = Router();
// Configure multer for single coverImage upload
router.post('/create-post', fileUpload.single('coverImage'), createPost);

export default router;