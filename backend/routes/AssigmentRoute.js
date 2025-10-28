import express from "express";
import { createAssignment, deleteAssignment, editAssignment, getAllAssignments } from "../controllers/AssigmentController.js";
const router = express.Router();
router.post("/Assignment", createAssignment);
router.get("/Assignment/:userid", getAllAssignments);
router.patch("/AssignmentEdit", editAssignment);
router.delete("/Assignment/:userid/:taskId", deleteAssignment);
export default router;
