import express from "express";
import * as health from "#controllers/health.js";
import * as info from "#controllers/info.js";

const router = express.Router();

router.get("/health", health.getHealth);
router.get("/", info.getInfo);

export default router;
