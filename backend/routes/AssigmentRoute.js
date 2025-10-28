import express from "express";
import { createAssignment, deleteAssignment, editAssignment, getAllAssignments } from "../controllers/AssigmentController.js";
const Assigmentrouter = express.Router();
Assigmentrouter.post("/Assignment", createAssignment);
Assigmentrouter.get("/Assignment/:userid", getAllAssignments);
Assigmentrouter.patch("/AssignmentEdit", editAssignment);
Assigmentrouter.delete("/Assignment/:userId/:assignmentId", deleteAssignment);
export default Assigmentrouter;
// api/Assignment
