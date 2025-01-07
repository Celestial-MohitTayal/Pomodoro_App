import { useState, useEffect } from "react";

const useTaskListLogic = (toggle, setToggle) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_SECRET_KEY;

  // Fetch tasks
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toggle]);

  // Select a task to navigate to its details
  const selectedTask = (taskId) => {
    localStorage.setItem("taskId", taskId);
    setToggle((prev) => !prev);
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ title: newTask, description: [] }),
        });
        const newTaskData = await response.json();
        setTasks([...tasks, newTaskData]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
      setNewTask("");
    }
  };

  // Toggle task completion
  // const toggleTaskCompletion = async (taskId) => {
  //   const task = tasks.find((task) => task._id === taskId);
  //   try {
  //     const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       body: JSON.stringify({
  //         title: task.title,
  //         description: task.description,
  //         completed: !task.completed,
  //       }),
  //     });
  //     const updatedTask = await response.json();
  //     setTasks((prevTasks) =>
  //       prevTasks.map((item) =>
  //         item._id === taskId ? { ...item, completed: updatedTask.completed } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating task completion:", error);
  //   }
  // };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await fetch(`${apiUrl}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Open the task edit dialog
  const openEditDialogHandler = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
    setOpenEditDialog(true);
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setEditedTaskText("");
  };

  // Save edited task
  const handleEditTask = async () => {
    const task = tasks.find((task) => task._id === editingTaskId);
    try {
      const response = await fetch(`${apiUrl}/api/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title: editedTaskText,
          description: task.description,
          completed: task.completed,
        }),
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === editingTaskId ? { ...item, title: updatedTask.title } : item
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
    closeEditDialog();
  };

  // Submit new task on Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return {
    tasks,
    newTask,
    editedTaskText,
    openEditDialog,
    setNewTask,
    selectedTask,
    setEditedTaskText,
    addTask,
    // toggleTaskCompletion,
    deleteTask,
    openEditDialogHandler,
    closeEditDialog,
    handleEditTask,
    handleKeyDown,
  };
};

export default useTaskListLogic;
