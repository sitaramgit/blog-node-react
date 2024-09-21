import { Router } from 'express';
import { getBlogs, createNewBlog } from '../controllers/blogController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBlogs);
router.post('/', authenticateJWT, createNewBlog);

export default router;
