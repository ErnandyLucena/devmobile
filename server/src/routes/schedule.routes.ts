import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/availability', ScheduleController.getByDoctorAndDate);

export default router;