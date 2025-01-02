export const styles = {
    textField: {
      "& .MuiOutlinedInput-root": {
        height: 40,
        "& fieldset": { borderColor: "#2BC59A" },
      },
      "& .MuiInputLabel-root": { color: "#c4c4c4", fontSize: "0.9rem" },
      "& .MuiInputBase-input": { color: "#c4c4c4", padding: "6px 10px" },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2BC59A",
      },
      "& .MuiInputBase-input::placeholder": { color: "#2BC59A" },
    },
    addButton: {
      boxShadow: 3,
      "&:hover": { boxShadow: 6 },
      fontSize: "14px",
      padding: "6px 12px",
      height: 40,
      minWidth: 100,
      marginLeft: 2,
    },
    paper: {
      minHeight: 200,
      maxHeight: 200,
      overflow: "auto",
      backgroundColor: "#303030",
      borderRadius: "8px",
      padding: "10px",
    },
    listItem: (task) => ({
      display: "flex",
      alignItems: "center",
      backgroundColor: task.completed ? "#d4edda" : "#3C3C3C",
      borderRadius: "5px",
      marginBottom: "10px",
      padding: "8px 12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "all 0.2s ease",
      cursor: "pointer",
    }),
    checkbox: {
      color: "#c4c4c4",
      "&.Mui-checked": { color: "#6c757d" },
      "&:hover": { backgroundColor: "transparent" },
    },
    listItemText: (task) => ({
      color: task.completed ? "#6c757d" : "#c4c4c4",
      fontWeight: task.completed ? "400" : "500",
    }),
    iconButton: { marginRight: "10px" },
    dialog: {
      padding: 16,
      "& .MuiDialog-paper": {
        backgroundColor: "#2BC59A",
        borderRadius: "12px",
        maxWidth: "500px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      },
    },
    dialogTitle: {
      backgroundColor: "#2BC59A",
      color: "#303030",
      fontSize: "1.5rem",
      padding: "16px",
      textAlign: "center",
      fontWeight: "bold",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    dialogContent: {
      backgroundColor: "#2BC59A",
      padding: "40px",
    },
    edittextField: {
      marginTop: "16px",
      "& .MuiOutlinedInput-root": {
        height: "50px",
        "& fieldset": {
          borderColor: "#303030",
        },
        "&:hover fieldset": {
          borderColor: "#303030",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#303030",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#303030",
      },
      "& .MuiInputBase-input": {
        color: "#303030",
        padding: "12px",
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#303030",
      },
    },
    dialogActions: {
      backgroundColor: "#2BC59A",
      padding: "12px",
      justifyContent: "center",
    },
  };