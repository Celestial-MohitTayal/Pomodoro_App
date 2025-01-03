export const styles = {
    container: {
        backgroundColor: "#303030",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    },
    form: {
      padding: 2,
      width: { lg: "25%", sm: "45%", xs: "70%" },
      backgroundColor: "#3C3C3C",
      color: "#2BC59A",
      borderRadius: 2,
      boxShadow: 3,
      textAlign: "center",
    },
    title: {
      marginBottom: 2,
      fontWeight: "bold",
    },
    input: {
      width: "75%",
      marginBottom: 2,
      backgroundColor: "transparent",
      color: "white",
      "& .MuiInputBase-input": { color: "white" },
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2BC59A" },
    },
    button: {
      width: "40%",
      marginBottom: 2,
      backgroundColor: "#2BC59A",
      "&:hover": { backgroundColor: "#1AB49A" },
    },
    errorText: {
      color: "red",
      marginBottom: 2,
    },
    footerText: {
      color: "#c4c4c4",
    },
    linkButton: {
      color: "#c4c4c4",
      fontWeight: "bold",
      paddingLeft: 1,
      paddingRight: 0,
      "&:hover": { color: "white" },
    },
  };