import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTasks, removeTasks } from "../../../store/tasksSlice";

// Custom hook for task logic
const useTaskDetailsLogic = (taskId, token, toggle) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [descriptionList, setDescriptionList] = useState([]);
  const [time, setTime] = useState("");
  const [updateList, setUpdateList] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedTaskTime, setEditedTaskTime] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [error, setError] = useState(null);

  const firstRender = useRef(false);

  const dispatch = useDispatch();

  // Fetch tasks from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SECRET_KEY}/api/tasks`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setTasks(data);

      let task = data?.filter((task) => task._id === taskId);
      if (task[0]?.description) {
        setDescriptionList(task[0]?.description);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // dispatch(addTasks(descriptionList));
  useEffect(() => {
    dispatch(addTasks(descriptionList));
  }, [descriptionList]);

  useEffect(() => {
    fetchData();
  }, [toggle]);

  const task = tasks?.filter((task) => task._id === taskId);

  // Update task description via PUT request
  const addDescription = async () => {
    try {
      let count = 0;
      descriptionList.map((subtask) => {
        if (subtask.completed == true) {
          count++;
        }
      });
      if (count == descriptionList.length && descriptionList.length !== 0) {
        task[0].completed = true;
      } else {
        task[0].completed = false;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SECRET_KEY}/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            title: task[0]?.title,
            description: descriptionList,
            completed: task[0]?.completed,
          }),
        }
      );
      const updatedTask = await response.json();
      const updatedTasks = tasks.map((item) =>
        item._id === taskId
          ? { ...item, description: updatedTask.description }
          : item
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      addDescription();
    } else {
      firstRender.current = true;
    }
  }, [updateList]);

  // Add new subtask
  const addSubTask = () => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (newTask.trim() && time.trim() && regex.test(time)) {
      const newSubTask = {
        id: uuidv4(),
        task: newTask,
        time: Number(time),
        completed: false,
      };
      setDescriptionList([...descriptionList, newSubTask]);
      setNewTask("");
      setTime("");
      setUpdateList((prev) => !prev);
    } else {
      setError("Please enter only numbers in time field.");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskIndex) => {
    setDescriptionList(
      descriptionList.map((task) =>
        task?.id === taskIndex ? { ...task, completed: !task.completed } : task
      )
    );
    setUpdateList((prev) => !prev);
  };

  // Delete task
  const deleteTask = (indexToDelete) => {
    setDescriptionList(
      descriptionList.filter((task) => task?.id !== indexToDelete)
    );
    setUpdateList((prev) => !prev);
  };

  // Handle task edit
  const openEditDialogHandler = (task, time, taskIndex) => {
    setEditingTaskId(taskIndex);
    setEditedTaskText(task);
    setEditedTaskTime(time);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTaskText("");
    setEditedTaskTime("");
  };

  const handleEditTask = () => {
    setDescriptionList(
      descriptionList.map((task) =>
        task?.id === editingTaskId
          ? { ...task, task: editedTaskText, time: editedTaskTime }
          : task
      )
    );
    setUpdateList((prev) => !prev);
    closeEditDialog();
  };

  // Submit form on Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addSubTask();
    }
  };

  return {
    error,
    tasks,
    time,
    newTask,
    editedTaskText,
    editedTaskTime,
    openEditDialog,
    setTime,
    setNewTask,
    addSubTask,
    setEditedTaskText,
    setEditedTaskTime,
    toggleTaskCompletion,
    deleteTask,
    openEditDialogHandler,
    closeEditDialog,
    handleEditTask,
    handleKeyDown,
  };
};

export default useTaskDetailsLogic;
