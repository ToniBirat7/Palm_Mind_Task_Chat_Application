// For Routes
import { Router } from "express";

const router = Router();
router.get("/:id", (req, res) => {
  console.log("Basic Id");
  return res.send({ msg: "HI" });
});

export default router;
