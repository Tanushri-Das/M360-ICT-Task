import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Taskform from "../Pages/Taskform/Taskform";
import TaskList from "../Pages/TaskList/TaskList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/taskform",
        element: <Taskform />,
      },
      {
        path: "/tasklist",
        element: <TaskList />,
      },
    ],
  },
]);
export default routes;
