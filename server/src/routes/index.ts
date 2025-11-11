import { Router } from "express";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
import appointmentsRoutes from "./appointments.routes";
import patientsRoutes from "./patients.routes";
import debugRoutes from "./debug.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", usersRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/patients", patientsRoutes);
router.use("/debug", debugRoutes);

export default router;
