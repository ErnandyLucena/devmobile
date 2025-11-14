import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateAppointment } from '../middleware/validation.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', validateAppointment, AppointmentController.create);

router.get('/my-appointments', AppointmentController.getMyAppointments);

export default router;