import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { API } from "./SignUp";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AssignmentData {
  _id: string;
  userId: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
}

export const Editmodel = React.memo(
  ({
    setOpen,
    open,
    assignment,
    userId,
  }: {
    setOpen: (isTrue: boolean) => void;
    open: boolean;
    assignment: AssignmentData;
    userId: String;
  }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [deadline, setDeadline] = useState("");
    const queryClient = useQueryClient();

    useEffect(() => {
      if (assignment) {
        setTitle(assignment.title);
        setDescription(assignment.description);
        setSubject(assignment.subject);
        setDeadline(assignment.deadline.slice(0, 10));
      }
    }, [assignment]);

    const updateAssignment = useMutation({
      mutationFn: async (data: any) => API.patch(`/api/AssignmentEdit`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["assignments"] });
        toast.success("Assignment updated successfully!");
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Update failed");
      },
    });

    const handleSave = () => {
      if (!title || !description || !subject || !deadline || !userId)
        return toast.info("Please fill all fields");
      if (
        title == assignment.title &&
        description == assignment.description &&
        subject == assignment.subject &&
        deadline == assignment.deadline.slice(0, 10)
      ) {
        console.log("aca");
        setOpen(false);
        return;
      }
      const data = {
        assignmentId: assignment._id,
        title,
        description,
        subject,
        deadline,
        userId: userId,
      };
      updateAssignment.mutate(data);
    };

    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="info">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={updateAssignment.isPending}
          >
            {updateAssignment.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
