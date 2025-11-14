import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.use(authMiddleware);

router.get('/profile', PatientController.getProfile);

export default router;