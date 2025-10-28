import express from "express";
import {
    verifyLogin,
    verifySignup,
} from "../controllers/AuthController.js";
const router = express.Router();
router.post("/signup", verifySignup);
router.post("/login", verifyLogin);

export default router;
