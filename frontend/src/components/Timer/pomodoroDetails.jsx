import React from "react";
import technique from "../../assets/pomodoro-technique.jpg";
import { Dialog, DialogContent, Box } from "@mui/material";

const PomodoroDetails = ({ openDialog, setOpenDialog }) => {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogContent>
        <Box sx={{ width: "100%", height: "100%" }}>
          <img
            src={technique}
            alt="Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PomodoroDetails;
