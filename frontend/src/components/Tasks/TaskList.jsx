import React, { useEffect, useState } from "react";
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
import axios from "axios";

const TaskList = ({ setToggle, toggle }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const token = localStorage.getItem("token");

  const apiUrl = import.meta.env.VITE_SECRET_KEY;

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/tasks`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setTasks(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [toggle]);

  //saving task that is selected
  const selectedTask = (taskId) => {
    localStorage.setItem("taskId", taskId);
    setToggle((prev) => !prev);
  };

  // Function to handle adding new tasks
  const addTask = () => {
    if (newTask.trim()) {
      axios
        .post(
          `${apiUrl}/api/tasks`,
          { title: newTask, description: [] },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then((response) => {
          setTasks([...tasks, response.data]);
        });
      setNewTask("");
    }
  };

  // Function to handle task completion
  const toggleTaskCompletion = (taskId) => {
    setToggle((prev) => !prev);
    let task = tasks.filter((task) => task._id === taskId);
    axios
      .put(
        `${apiUrl}/api/tasks/${taskId}`,
        {
          title: task[0]?.title,
          description: task[0]?.description,
          completed: !task[0]?.completed,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        const updatedTasks = tasks?.map((item) =>
          item._id === taskId
            ? { ...item, completed: response.data.completed }
            : item
        );

        // Update the tasks state with the new list
        setTasks(updatedTasks);
      });
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    axios
      .delete(`${apiUrl}/api/tasks/${taskId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        fetchData();
      });
  };

  // Function to handle editing a task
  const openEditDialogHandler = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTaskText("");
  };

  const handleEditTask = () => {
    let task = tasks.filter((task) => task._id === editingTaskId);
    axios
      .put(
        `${apiUrl}/api/tasks/${editingTaskId}`,
        {
          title: editedTaskText,
          description: task[0].description,
          completed: task[0].completed,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        const updatedTasks = tasks?.map((item) =>
          item._id === editingTaskId
            ? { ...item, title: response.data.title }
            : item
        );

        // Update the tasks state with the new list
        setTasks(updatedTasks);
      });
    closeEditDialog();
  };

  // Submit form by enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
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

      {/* Add Task Form */}
      <Box display="flex" mb={2} alignItems="center">
        <TextField
          label="Add a Task Title"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 40,
              "& fieldset": {
                borderColor: "#2BC59A",
              },
              "&:hover fieldset": {
                borderColor: "#2BC59A",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2BC59A",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#c4c4c4",
              fontSize: "0.9rem",
            },
            "& .MuiInputBase-input": {
              color: "#c4c4c4",
              padding: "6px 10px",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2BC59A",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#2BC59A",
            },
          }}
        />
        <Button
          variant="contained"
          color="default"
          sx={{
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
            fontSize: "14px",
            padding: "6px 12px",
            height: 40,
            minWidth: 100,
            marginLeft: 2,
          }}
          onClick={addTask}
        >
          Add
        </Button>
      </Box>

      {/* Task List */}
        <Paper
          elevation={3}
          style={{
            minHeight: 200,
            maxHeight: 200,
            overflow: "auto",
            backgroundColor: "#303030",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <List>
            {tasks?.map((task) => (
              <ListItem
                onClick={() => selectedTask(task?._id)}
                key={task?._id}
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
                  checked={task?.completed}
                  onChange={() => toggleTaskCompletion(task?._id)}
                  color="disabled"
                  sx={{
                    color: "#c4c4c4",
                    "&.Mui-checked": {
                      color: "#6c757d",
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
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
                  onClick={() => openEditDialogHandler(task?._id, task?.title)}
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteTask(task?._id)}
                  color="secondary"
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
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2BC59A",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#2BC59A", color: "#303030" }}>
          Edit Task
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#2BC59A" }}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            sx={{
              margin: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3C3C3C",
                },
                "&:hover fieldset": {
                  borderColor: "#3C3C3C",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3C3C3C",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#3C3C3C",
              },
              "& .MuiInputBase-input": {
                color: "#3C3C3C",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3C3C3C",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#3C3C3C",
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
