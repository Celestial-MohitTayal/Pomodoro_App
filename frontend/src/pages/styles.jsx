export const profileStyles = {
    container: {
      backgroundColor: "#303030",
      height: "100vh",
      width: "100vw",
      display: "flex",
      overflow: "hidden",
    },
    boxWrapper: {
      width: "100%",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    formBox: {
      padding: 2,
      width: { lg: "25%", sm: "45%" },
      backgroundColor: "#3C3C3C",
      color: "#2BC59A",
      borderRadius: 2,
      boxShadow: 3,
      textAlign: "center",
    },
    title: {
      marginBottom: 3,
      fontWeight: "bold",
    },
    email: {
      marginBottom: 3,
      color: "#c4c4c4",
    },
    textField: {
      width: "75%",
      marginBottom: 2,
      backgroundColor: "transparent",
      color: "white",
      "& .MuiInputBase-input": { color: "white" },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2BC59A",
      },
    },
    errorText: {
      color: "red",
    },
    button: {
      color: "#c4c4c4",
      fontWeight: "bold",
      paddingLeft: 1,
      paddingRight: 0,
      "&:hover": { color: "white" },
    },
    submitButton: {
      width: "30%",
      marginBottom: 2,
      backgroundColor: "#2BC59A",
      marginTop: 3,
      "&:hover": { backgroundColor: "#1AB49A" },
    },
  };
  