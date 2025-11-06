// For Routes
import { Router } from "express";

const router = Router();
router.get("/:id", () => {
  console.log("Basic Id");
});

export default router;
