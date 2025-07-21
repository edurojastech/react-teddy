import { createBrowserRouter } from "react-router-dom"
import Intro from "../pages/Intro";
import Home from "../pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "*",
    element: <> PAGINA NAO ENCONTRADA! </>,
  },
])

export default routes;
