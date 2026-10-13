import express from "express";
import rendelController from "../controllers/rendelController.js";

const router = express.Router();

router.get("/", rendelController.getRendel);

export default router;
