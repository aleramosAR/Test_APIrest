import express from "express";
import {
  getProductsController,
  getProductController,
  postProductController,
  updateProductController,
  deleteProductController,
  clearProductController
} from '../controllers/ProductControllers.js'

const router = express.Router();
router.use(express.json());

router.get("/", getProductsController);
router.get("/:id", getProductController);
router.post("/", postProductController);
router.put("/actualizar/:id", updateProductController);
router.delete("/borrar/:id", deleteProductController);
router.post("/destroy", clearProductController);

export default router;