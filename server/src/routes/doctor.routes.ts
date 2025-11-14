import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.get('/', DoctorController.listAll);

router.post('/', authMiddleware, DoctorController.create);

router.use(authMiddleware);


export default router;