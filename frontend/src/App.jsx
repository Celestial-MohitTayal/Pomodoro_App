import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/", // Login route
      element: <Login />,
    },
    {
      path: "/register", // Register route
      element: <Register />,
    },
    {
      path: "/home", // Register route
      element: <Home />,
    },
    {
      path: "/profile", // Register route
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
