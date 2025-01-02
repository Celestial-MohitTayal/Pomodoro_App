export const styles = {
    textField: {
      "& .MuiInputBase-input": { color: "#c4c4c4" },
      marginLeft: 2,
    },
    addButton: {
      color: "#2BC59A",
      marginLeft: 2,
      padding: "6px",
      height: 40,
      width: 40,
      "&:hover": { backgroundColor: "#c4c4c4" },
    },
    paper: {
      minHeight: 200,
      maxHeight: 200,
      overflow: "auto",
      backgroundColor: "#303030",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "10px",
    },
    listItem: (descriptionTask) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: descriptionTask?.completed ? "line-through" : "none",
      borderRadius: "5px",
      marginBottom: "10px",
      padding: "8px 12px",
      transition: "all 0.2s ease",
    }),
    checkbox: {
      color: "#c4c4c4",
      "&.Mui-checked": { color: "#6c757d" },
      "&:hover": { backgroundColor: "transparent" },
    },
    listItemText: (descriptionTask) => ({
      marginLeft: 2,
      color: descriptionTask?.completed ? "#6c757d" : "#c4c4c4",
      fontWeight: descriptionTask?.completed ? "400" : "500",
    }),
    iconButton: {
      marginRight: "10px",
    },
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