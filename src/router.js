import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Shopper from "./Components/Shopper/Shopper";
import StylistChat from "./Components/Stylist/StylistChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stylist",
    element: <StylistChat />,
  },
  {
    path: "/shopper",
    element: <Shopper />,
  },
]);

export default router;
