import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
  const [descriptionList, setDescriptionList] = useState([]);
  const [updateList, setUpdateList] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const apiUrl = import.meta.env.VITE_SECRET_KEY;

  const taskId = localStorage.getItem("taskId");
  const token = localStorage.getItem("token");
  const firstRender = useRef(false);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/tasks`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setTasks(response.data);
        let task = tasks?.filter((task) => task._id === taskId);
        if (task[0]?.description) {
          setDescriptionList(task[0]?.description);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [toggle]);

  let task = tasks?.filter((task) => task._id === taskId);

  const addDescription = () => {
    axios
      .put(
        `${apiUrl}/api/tasks/${taskId}`,
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
        setTasks(updatedTasks);
      });
  };

  useEffect(() => {
    if (firstRender.current) {
      addDescription();
    } else {
      firstRender.current = true;
    }
  }, [updateList]);

  // Function to handle adding new tasks
  const addSubTask = () => {
    let obj = {
      id: uuidv4(),
      task: newTask,
      completed: false,
    };
    let newArray = [...descriptionList, obj];
    setDescriptionList(newArray);
    setNewTask("");
    setUpdateList((prev) => !prev);
  };

  // Function to handle task completion
  const toggleTaskCompletion = (taskIndex) => {
    setDescriptionList(
      descriptionList.map((task) =>
        task?.id === taskIndex ? { ...task, completed: !task.completed } : task
      )
    );
    setUpdateList((prev) => !prev);
  };

  // Function to delete a task
  const deleteTask = (indexToDelete) => {
    const newArray = descriptionList.filter(
      (task) => task?.id !== indexToDelete
    );
    setDescriptionList(newArray);
    setUpdateList((prev) => !prev);
  };

  // Function to handle editing a task
  const openEditDialogHandler = (task, taskIndex) => {
    setEditingTaskId(taskIndex);
    setEditedTaskText(task);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTaskText("");
  };

  const handleEditTask = () => {
    setDescriptionList(
      descriptionList.map((task) =>
        task?.id === editingTaskId ? { ...task, task: editedTaskText } : task
      )
    );
    setUpdateList((prev) => !prev);
    closeEditDialog();
  };

  // Submit form by enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addSubTask();
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
        {task.length !== 0 ? task[0]?.title : "Select Task"}
      </Typography>

      {/* Input field and Add button */}
      <Box display="flex" mb={1} alignItems="center">
        <TextField
          label="Add Task Sub Topics"
          variant="standard"
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
        <IconButton
          sx={{
            color: "#2BC59A",
            marginLeft: 2,
            padding: "6px",
            height: 40,
            width: 40,
            "&:hover": { backgroundColor: "#c4c4c4" },
          }}
          onClick={addSubTask}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* To-Do List */}
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
          {task.length !== 0 ? (
            <List>
              {task[0]?.description?.map((descriptionTask) => (
                <ListItem
                  key={descriptionTask?.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: descriptionTask?.completed
                      ? "line-through"
                      : "none",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    padding: "8px 12px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Checkbox
                    checked={descriptionTask?.completed}
                    onChange={() => toggleTaskCompletion(descriptionTask?.id)}
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
                    primary={descriptionTask?.task}
                    style={{
                      color: descriptionTask?.completed ? "#6c757d" : "#c4c4c4",
                      fontWeight: descriptionTask?.completed ? "400" : "500",
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      openEditDialogHandler(
                        descriptionTask?.task,
                        descriptionTask?.id
                      )
                    }
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(descriptionTask?.id)}
                    color="secondary"
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: "#c4c4c4" }}>
              Please click on a task from Tasks List.
            </Typography>
          )}
        </Paper>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={closeEditDialog}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2BC59A",
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

export default TaskDetails;
