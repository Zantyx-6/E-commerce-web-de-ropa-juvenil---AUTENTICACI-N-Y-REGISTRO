import { Router } from "express";
import {
  getFeaturedProducts,
  getProductById,
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
} from "../controllers/productController";
import { authenticateToken, authorizeRole } from "../middlewares";

const router = Router();

router.get("/featured", getFeaturedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", authenticateToken, authorizeRole(["ADMIN"]), postProduct);
router.put("/:id", authenticateToken, authorizeRole(["ADMIN"]), putProduct);
router.delete("/:id", authenticateToken, authorizeRole(["ADMIN"]), removeProduct);

export default router;
