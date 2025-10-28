import Assignment from "../model/AssigmentModel.js";
import UserData from "../model/userModal.js";
export const createAssignment = async (req, res) => {
  const { userId, title, description, subject, deadline } = req.body;
  try {
    const user = await UserData.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied: Only teachers can create assignments" });
    }
    const assignment = new Assignment({
      userId: user._id,
      title,
      description,
      subject,
      deadline,
    });
    await assignment.save();
    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAssignments = async (req, res) => {
  const { userId } = req.params;
  const { pageCount = 1 } = req.query;
  try {
    const user = await UserData.findById(userId);
    if (!user) return res.status(401).json({ msg: "User not Available" });
    let assignments = await Assignment.find()
      .skip((Number(pageCount) - 1) * 5)
      .limit(6)
      .sort({ createdAt: -1 });
    res.json({
      count: assignments.length > 5 ? 5 : assignments.length,
      assignments: assignments.slice(0, 5),
      next: assignments.length === 6,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editAssignment = async (req, res) => {
  const { userId, assignmentId, title, description, subject, deadline } = req.body;
  try {
    const user = await UserData.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied: Only teachers can edit assignments" });
    }
    const updatedAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId, userId: userId },
      { title, description, subject, deadline },
      { new: true }
    );
    if (!updatedAssignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.json({
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { userId, assignmentId } = req.params;
  try {
    const user = await UserData.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied: Only teachers can delete assignments" });
    }
    const assignment = await Assignment.findByIdAndDelete(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
