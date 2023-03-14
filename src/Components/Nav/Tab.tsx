import { Link, NavLink } from "react-router-dom";
import "./nav.css";

type TabProps = {
  path: string;
};

const Tab = ({ path }: TabProps) => {
  const tabName = path.slice(1, path.length);

  return (
    <NavLink
      to={path}
      className={({ isActive }) => `tab ${isActive ? "selected" : "option"}`}
    >
      <h3 className="tab-text">{tabName || "HOME"}</h3>
    </NavLink>
  );
};

export default Tab;
