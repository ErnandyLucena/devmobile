import { Router } from "express";
import { AppointmentsController } from "../controllers/appointments.controller";

const router = Router();

router.post("/", AppointmentsController.create);
router.get("/", AppointmentsController.list);
router.put("/:id", AppointmentsController.update);

export default router;
