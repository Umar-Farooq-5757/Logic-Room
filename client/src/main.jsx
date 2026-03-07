import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Problem from "./pages/Problem.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/problem",
            element: <Problem />,
          }
        ]
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppContextProvider>
  </StrictMode>,
);
