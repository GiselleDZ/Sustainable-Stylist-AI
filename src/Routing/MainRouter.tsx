import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage";

import routes from "./routes";
import { generateKey } from "../utils";

const MainRouter = () => {
  return (
    <Routes>
      {routes.map((r: { path: string; element: ReactNode }, i: number) => (
        <Route
          path={r.path}
          element={r.element}
          key={generateKey(`routes_${i}`)}
        />
      ))}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default MainRouter;
