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
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import useTaskListLogic from "./useTaskList";
import { styles } from "./styles";

const TaskList = ({ toggle, setToggle, setIsStarted }) => {
  const {
    tasks,
    newTask,
    editedTaskText,
    openEditDialog,
    selectedTask,
    setNewTask,
    setEditedTaskText,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    openEditDialogHandler,
    closeEditDialog,
    handleEditTask,
    handleKeyDown,
  } = useTaskListLogic(toggle, setToggle, setIsStarted);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        fontFamily="serif"
        gutterBottom
      >
        Tasks List
      </Typography>

      {/* Add Task Form */}
      <Box display="flex" mb={2} alignItems="center">
        <TextField
          label="Add a Task Title"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={styles.textField}
        />
        <Button
          variant="contained"
          color="default"
          sx={styles.addButton}
          onClick={addTask}
        >
          Add
        </Button>
      </Box>

      {/* Task List */}
      <Paper elevation={3} sx={styles.paper}>
        <List>
          {tasks?.map((task) => (
            <ListItem key={task._id} sx={styles.listItem(task)}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id)}
                color="disabled"
                sx={styles.checkbox}
              />
              <ListItemText
                onClick={() => selectedTask(task?._id)}
                primary={task.title}
                sx={styles.listItemText(task)}
              />
              <IconButton
                onClick={() => openEditDialogHandler(task?._id, task?.title)}
                color="primary"
                sx={styles.iconButton}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteTask(task._id)}
                color="secondary"
                sx={styles.iconButton}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
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
            label="Task Title"
            variant="outlined"
            fullWidth
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            sx={styles.edittextField}
          />
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button
            onClick={closeEditDialog}
            color="secondary"
            sx={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditTask}
            color="primary"
            sx={styles.saveButton}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList;
