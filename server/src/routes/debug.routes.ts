import { Router } from "express";
import { DebugController } from "../controllers/debug.controller";

const router = Router();

router.get("/db-info", DebugController.dbInfo);

export default router;
