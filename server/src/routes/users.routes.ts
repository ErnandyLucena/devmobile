import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router.get("/doctors", UsersController.listDoctors);
router.get("/employees", UsersController.listEmployees);
router.get("/users/:id", UsersController.getById);

export default router;
