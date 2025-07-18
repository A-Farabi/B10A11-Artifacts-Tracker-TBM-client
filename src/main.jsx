import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import AuthProvider from "./Auth/AuthProvider";
import Login from "./Pages/Login";
import AllArtifacts from "./Pages/AllArtifacts";
import AddArtifacts from "./Pages/AddArtifacts";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";

<ToastContainer position="top-center" autoClose={3000} />

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "all-artifacts",
        element: <AllArtifacts></AllArtifacts>
      },
      {
        path: "add-artifacts",
        element: <AddArtifacts></AddArtifacts>
      },
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  <ToastContainer 
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);
