import React from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Delete as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import useTaskDetailsLogic from "./useTaskDetails";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { removeTasks } from "../../../store/tasksSlice";

const TaskDetails = ({ toggle, setToggle, setIsStarted }) => {
  const taskId = localStorage.getItem("taskId");
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();


  const {
    tasks,
    time,
    newTask,
    editedTaskText,
    editedTaskTime,
    openEditDialog,
    setTime,
    setEditedTaskText,
    setEditedTaskTime,
    setNewTask,
    addSubTask,
    toggleTaskCompletion,
    deleteTask,
    openEditDialogHandler,
    closeEditDialog,
    handleEditTask,
    handleKeyDown,
  } = useTaskDetailsLogic(taskId, token, toggle);

  const task = tasks?.filter((task) => task._id === taskId);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        fontFamily="serif"
        gutterBottom
      >
        {task[0]?.title}
        <IconButton
          onClick={() => {
            dispatch(removeTasks()) 
            setToggle((prev) => !prev)
            setIsStarted(false)}
          }
          sx={{
            color: "#D3D3D3",
            transition: "transform 0.075s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Typography>

      {/* Add Subtask Input */}
      <Box display="flex" mb={1} alignItems="center">
        <TextField
          label="Add Task Sub Topics"
          variant="standard"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={styles.textField}
        />
        <TextField
          label="Add Time for Task"
          variant="standard"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={styles.textField}
        />
        <IconButton onClick={addSubTask} sx={styles.addButton}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Task List */}
      <Paper elevation={3} sx={styles.paper}>
        {task[0]?.description?.length !== 0 ? (
          <List>
            {task[0]?.description?.map((descriptionTask) => (
              <ListItem
                key={descriptionTask?.id}
                sx={styles.listItem(descriptionTask)}
              >
                <Checkbox
                  checked={descriptionTask?.completed}
                  onChange={() => toggleTaskCompletion(descriptionTask?.id)}
                  color="disabled"
                  sx={styles.checkbox}
                />
                <ListItemText
                  primary={descriptionTask?.task}
                  secondary={descriptionTask?.time + " min"}
                  sx={styles.listItemText(descriptionTask)}
                />
                <IconButton
                  onClick={() =>
                    openEditDialogHandler(
                      descriptionTask?.task,
                      descriptionTask?.time,
                      descriptionTask?.id
                    )
                  }
                  color="primary"
                  sx={styles.iconButton}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTask(descriptionTask?.id)}
                  color="secondary"
                  sx={styles.iconButton}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ color: "#c4c4c4" }}>
            Please add a task.
          </Typography>
        )}
      </Paper>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={closeEditDialog}
        sx={styles.dialog}
      >
        <DialogTitle sx={styles.dialogTitle}>Edit Task</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <TextField
            label="Edit Sub Task"
            variant="outlined"
            fullWidth
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            sx={styles.edittextField}
          />
          <TextField
            label="Edit Sub Task"
            variant="outlined"
            fullWidth
            value={editedTaskTime}
            onChange={(e) => setEditedTaskTime(e.target.value)}
            sx={styles.edittextField}
          />
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={closeEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};



export default TaskDetails;
