import About from "../Components/About/About";
import Home from "../Components/Home/Home";
import Shopper from "../Components/Shopper/Shopper";
import StylistChat from "../Components/Stylist/StylistChat";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/stylist",
    element: <StylistChat />,
  },
  {
    path: "/shopper",
    element: <Shopper />,
  },
  {
    path: "/about",
    element: <About />,
  },
];

export default routes;
