import express from "express";

import {
  createNewAccessCode,
  validateAccessCode,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/createNewAccessCode", createNewAccessCode);
router.post("/validateAccessCode", validateAccessCode);

export default router;
