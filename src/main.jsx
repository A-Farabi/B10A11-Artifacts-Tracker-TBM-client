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
import Home from "./Components/Home";
import LikedArtifacts from "./Components/LikedArtifacts";
import PrivateRoutes from "./Auth/PrivateRoutes";
import MyArtifacts from "./Components/MyArtifacts";
import ArtifactDetail from "./Components/ArtifactDetail";
import UpdateArtifact from "./Components/UpdateArtifact";

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
        path: "/",
        element: <Home></Home>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "all-artifacts",
        element: <AllArtifacts></AllArtifacts>,
        loader: ()=>fetch('http://localhost:5000/all-artifacts')
      },
      {
        path: "all-artifacts/:id",
        element: <PrivateRoutes><ArtifactDetail></ArtifactDetail></PrivateRoutes>,
        loader: ({params})=>fetch(`http://localhost:5000/all-artifacts/${params.id}`)
      },
      {
        path: "add-artifacts",
        element: <PrivateRoutes><AddArtifacts></AddArtifacts></PrivateRoutes>
      },
      {
        path: "liked-artifacts",
        element: <PrivateRoutes><LikedArtifacts></LikedArtifacts></PrivateRoutes>
      },
      {
        path: "my-artifacts",
        element: <PrivateRoutes><MyArtifacts></MyArtifacts></PrivateRoutes>
      },
      // {
      //   path: "update-artifact/:id",
      //   element: <PrivateRoutes><UpdateArtifact></UpdateArtifact></PrivateRoutes>
      // },
      
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
