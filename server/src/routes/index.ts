import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';
import doctorRoutes from './doctor.routes';
import patientRoutes from './patient.routes';
import employeeRoutes from './employee.routes';
import scheduleRoutes from './schedule.routes';
import appointmentRoutes from './appointment.routes';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/employees', employeeRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/appointments', appointmentRoutes);

router.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default router;