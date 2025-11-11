import { Router } from "express";
import { PatientsController } from "../controllers/patients.controller";

const router = Router();

router.post("/", PatientsController.create);
router.get("/", PatientsController.list);
router.get("/:id", PatientsController.getById);

export default router;
