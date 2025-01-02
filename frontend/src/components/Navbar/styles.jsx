export const styles = {
    appBar: {
      backgroundColor: "#3C3C3C",
      padding: "8px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontFamily: "Times New Roman, serif",
      fontWeight: "bold",
      letterSpacing: "0.1rem",
      color: "#2BC59A",
    },
    userActions: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    profileButton: {
      fontFamily: "Times New Roman, serif",
      fontWeight: "bold",
      letterSpacing: "0.1rem",
      color: "#2BC59A",
      fontSize: "1.5rem",
      transition: "transform 0.075s",
      "&:hover": { transform: "scale(1.05)" },
    },
    logoutButton: {
      color: "#D3D3D3",
      transition: "transform 0.075s",
      "&:hover": { transform: "scale(1.05)" },
    },
  };