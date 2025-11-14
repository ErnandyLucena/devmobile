import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/me', ProfileController.getMyProfile);
router.put('/me', ProfileController.update);

export default router;