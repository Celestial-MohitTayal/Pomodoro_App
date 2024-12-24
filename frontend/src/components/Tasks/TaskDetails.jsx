import React, { useState, useEffect } from "react";
import axios from "axios";
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

import { Delete as CloseIcon, Edit as EditIcon } from "@mui/icons-material";

const TaskDetails = ({ toggle }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const taskId = localStorage.getItem("taskId");
  const token = localStorage.getItem("token");


  const addDescription = () => {
    axios
      .put(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          title: task[0]?.title,
          description: descriptionList,
          completed: task[0]?.completed,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        const updatedTasks = tasks.map((item) =>
          item._id === taskId
            ? { ...item, description: response.data.description }
            : item
        );

        // Update the tasks state with the new list
        setTasks(updatedTasks);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/tasks/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setTasks(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [toggle]);

  let task = tasks.filter((task) => task._id === taskId);
  let descriptionList = task[0]?.description;

  // useEffect(() => {
  //   addDescription();
  // }, [descriptionList]);

  // Function to handle adding new tasks
  const addSubTask = () => {
    descriptionList?.push(newTask);
    addDescription();
  };

  // Function to handle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (index) => {
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
        {task ? task[0]?.title : "Select Task"}
      </Typography>

      {/* To-Do List */}
      <Paper
        style={{
          maxHeight: 200,
          overflow: "auto",
          backgroundColor: "#3C3C3C",
          boxShadow: "0 8px 10px rgba(0,0,0,0.4)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <List>
          {task[0]?.description?.map((task, index) => (
            <ListItem
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: task?.completed ? "line-through" : "none",
                borderRadius: "5px",
                marginBottom: "10px",
                padding: "8px 12px",
                // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
              }}
            >
              <Checkbox
                checked={task?.completed}
                onChange={() => toggleTaskCompletion(task?._id)}
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
                primary={task}
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
              <IconButton onClick={() => deleteTask(index)} color="secondary">
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Input field and Add button */}
      <Box display="flex" mt={2} alignItems="center">
        <TextField
          label="Add Task Sub Topics"
          variant="standard"
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
        <IconButton
          sx={{
            color: "#2BC59A",
            marginLeft: 2,
            padding: "6px", // Adjust icon button size
            height: 40,
            width: 40,
            "&:hover": { backgroundColor: "#c4c4c4" }, // No background on hover
          }}
          onClick={addSubTask}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={closeEditDialog}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2BC59A", // Custom dialog background color
            padding: "10px",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#2BC59A", color: "#303030" }}>
          Edit Task
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#2BC59A" }}>
          <TextField
            label="Edit Sub Task"
            variant="outlined"
            fullWidth
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            sx={{
              margin: "10px",
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

export default TaskDetails;
