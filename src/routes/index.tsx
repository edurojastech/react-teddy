import { createBrowserRouter } from "react-router-dom"
import Intro from "../pages/Intro";
import Home from "../pages/Home";
import Selecionados from "../pages/Selecionados";

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
    path: "/selecionados",
    element: <Selecionados />,
  },

  {
    path: "*",
    element: <> PAGINA NAO ENCONTRADA! </>,
  },
])

export default routes;
