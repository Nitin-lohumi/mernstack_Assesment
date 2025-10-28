import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";

interface AssignmentData {
  _id: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  assignment: AssignmentData | null;
}

const AssignmentDetailModal: React.FC<Props> = ({
  open,
  setOpen,
  assignment,
}) => {
  console.log(assignment);
  if (!assignment) return null;
  const formattedDeadline = new Date(assignment.deadline).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedCreated = assignment.createdAt
    ? new Date(assignment.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle className="font-bold text-xl text-gray-800">
        Assignment Details
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          {assignment.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Subject:{" "}
          <span className="font-medium text-gray-800">
            {assignment.subject}
          </span>
        </Typography>

        <Divider className="my-2" />

        <Typography variant="body1" className="mt-2 text-gray-700">
          {assignment.description}
        </Typography>

        <Divider className="my-3" />

        <Typography color="text.secondary">
          Deadline:{" "}
          <span
            className={`font-medium ${
              new Date(assignment.deadline) < new Date()
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {formattedDeadline}
          </span>
        </Typography>

        {assignment.createdAt && (
          <Typography color="text.secondary" className="mt-1">
            Created on: {formattedCreated}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDetailModal;
