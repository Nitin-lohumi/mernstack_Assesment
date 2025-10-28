import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    deadline: { type: Date, required: true },
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", AssignmentSchema);
export default Assignment;
