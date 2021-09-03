import express from "express";
import {
  redirectIndexController,
  goIndexController,
  goVisitasController,
  goExitController
} from '../controllers/FrontControllers.js'

const router = express.Router();

router.get('/', redirectIndexController);
router.get("/index", goIndexController);
router.get('/visitas', goVisitasController);
router.get("/exit", goExitController);

export default router;