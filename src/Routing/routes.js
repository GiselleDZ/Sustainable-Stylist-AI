import About from "../Components/About/About";
import Home from "../Components/Home/Home";
import Shopper from "../Components/Shopper/Shopper";
import Stylist from "../Components/Stylist/Stylist";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/stylist",
    element: <Stylist />,
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
