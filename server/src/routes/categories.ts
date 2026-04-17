import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
  postCategory,
  putCategory,
  removeCategory,
} from "../controllers/categoryController";
import { authenticateToken, authorizeRole } from "../middlewares";

const router = Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

router.post("/", authenticateToken, authorizeRole(["ADMIN"]), postCategory);
router.put("/:id", authenticateToken, authorizeRole(["ADMIN"]), putCategory);
router.delete("/:id", authenticateToken, authorizeRole(["ADMIN"]), removeCategory);

export default router;
