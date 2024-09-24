import { Router } from 'express';
import { register, login, googleLogin } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/google-login', googleLogin);
router.post('/login', login);

export default router;
