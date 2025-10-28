import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React from "react";

const PopUp = React.memo(
  ({
    isOpen,
    setOpen,
    DeleteId,
    handleDelete,
  }: {
    isOpen: boolean;
    setOpen: (val: boolean) => void;
    DeleteId: string;
    handleDelete: (noteId: string) => void;
  }) => {
    const handle_DeleteTask = () => {
      handleDelete(DeleteId);
      setOpen(false);
    };
    return (
      <>
        <Dialog
          className=""
          open={isOpen}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle className="text-xl! font-bold! capitalize! underline!">
            Delete assigment
          </DialogTitle>

          <DialogContent>
            <DialogTitle className="text-xl! font-bold! text-center!">
              Are you Sure! Delete This Assigment
            </DialogTitle>
          </DialogContent>
          <DialogActions className="flex! justify-between!">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handle_DeleteTask}>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default PopUp;
