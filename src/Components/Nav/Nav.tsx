import routes from "../../Routing/routes";
import Tab from "./Tab";
import "./nav.css";

const Nav = () => {
  const location = window.location.pathname;

  return (
    <>
      <nav>
        {routes.map((tab: { path: string }, i: number) => (
          <Tab path={tab.path} key={i} selected={location === tab.path} />
        ))}
      </nav>
      {location !== "/" && (
        <a href="/" id="close-tab">
          X
        </a>
      )}
    </>
  );
};

export default Nav;
