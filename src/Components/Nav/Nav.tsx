import routes from "../../Routing/routes";
import Tab from "./Tab";
import "./nav.css";
import { Link } from "react-router-dom";
import { generateKey } from "../../utils";

const Nav = () => {
  return (
    <>
      <nav>
        {routes.map((tab: { path: string }, i: number) => (
          <Tab path={tab.path} key={generateKey(`NavTab_${i}`)} />
        ))}
      </nav>
      {window.location.pathname !== "/" && (
        <Link to="/" id="close-tab">
          X
        </Link>
      )}
    </>
  );
};

export default Nav;
