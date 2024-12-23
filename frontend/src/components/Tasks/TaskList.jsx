import React, { useState } from "react";
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

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Function to handle adding new tasks
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTask, completed: false, description: [] },
      ]);
      setNewTask("");
    }
  };

  // Function to handle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks
        .reverse()
        .map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to handle editing a task
  const openEditDialogHandler = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTaskText(""); // Clear the edit field
  };

  const handleEditTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedTaskText } : task
      )
    );
    closeEditDialog();
  };

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

      {/* Input field and Add button */}
      {/* <Box display="flex" mb={2} gap={2}>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2BC59A", // White outline
              },
              "&:hover fieldset": {
                borderColor: "#2BC59A", // White outline on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2BC59A", // White outline when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#c4c4c4", // White label
            },
            "& .MuiInputBase-input": {
              color: "#c4c4c4", // White text
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2BC59A", // White outline
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#2BC59A", // White placeholder text
            },
          }}
        />
        <Button
          variant="contained"
          color="default"
          sx={{
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
            fontSize: "16px",
          }}
          onClick={addTask}
        >
          Add
        </Button>
      </Box> */}
      <Box display="flex" mb={2} alignItems="center">
              <TextField
                label="Add a Sub Task"
                variant="outlined"
                fullWidth
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Reduce height of the input
                    "& fieldset": {
                      borderColor: "#2BC59A", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#2BC59A", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2BC59A", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#c4c4c4", // Label color
                    fontSize: "0.9rem", // Reduce label font size
                  },
                  "& .MuiInputBase-input": {
                    color: "#c4c4c4", // Input text color
                    padding: "6px 10px", // Reduce padding inside the input
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2BC59A", // Outline border color
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#2BC59A", // Placeholder text color
                  },
                }}
              />
              <Button
                variant="contained"
                color="default"
                sx={{
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  fontSize: "14px", // Reduce font size for button
                  padding: "6px 12px", // Adjust padding to make button shorter
                  height: 40, // Reduce button height
                  minWidth: 100, // Prevent button from stretching too wide
                  marginLeft: 2, // Add some spacing between the input and button
                }}
                onClick={addTask}
              >
                Add
              </Button>
            </Box>
      

      {/* To-Do List */}
      <Paper
        style={{
          maxHeight: 200,
          overflow: "auto",
          backgroundColor: "#303030",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <List>
          {tasks.reverse().map((task) => (
            <ListItem
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: task.completed ? "#d4edda" : "#3C3C3C",
                borderRadius: "5px",
                marginBottom: "10px",
                padding: "8px 12px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                color="disabled"
                sx={{
                  color: "#c4c4c4", // Checkbox border color
                  "&.Mui-checked": {
                    color: "#6c757d", // Checkmark color
                  },
                  "&:hover": {
                    backgroundColor: "transparent", // Optional: Remove hover background
                  },
                }}
              />
              <ListItemText
                primary={task.title}
                style={{
                  color: task.completed ? "#6c757d" : "#c4c4c4",
                  fontWeight: task.completed ? "400" : "500",
                }}
              />
              <IconButton
                onClick={() => openEditDialogHandler(task.id, task.title)}
                color="primary"
                style={{ marginRight: "10px" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTask(task.id)} color="secondary">
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
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2BC59A", // Custom dialog background color
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#2BC59A", color: "#303030" }}>
          Edit Task
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#2BC59A",}}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3C3C3C", // Green outline
                },
                "&:hover fieldset": {
                  borderColor: "#3C3C3C", // Green outline on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3C3C3C", // Green outline when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "#3C3C3C", // White label
              },
              "& .MuiInputBase-input": {
                color: "#3C3C3C", // White text
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3C3C3C", // Green outline
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#3C3C3C", // Green placeholder text
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#2BC59A" }}>
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

export default TaskList;
