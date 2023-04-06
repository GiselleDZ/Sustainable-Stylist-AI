import routes from "../../Routing/routes";
import Tab from "./Tab";
import "./nav.css";
import { Link } from "react-router-dom";
import { generateKey } from "../../utils";
import { useEffect, useState } from "react";

const Nav = () => {
  // const [scrollable, setScrollable] = useState(false);

  // console.log(document.documentElement.scrollHeight);
  // useEffect(() => {
  //   if (document.body.clientHeight > 2000) setScrollable(true);
  //   else setScrollable(false);
  // }, [document.body]);

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
      {/* {scrollable && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          id="back-to-top"
        >
          Back To Top
        </button>
      )} */}
    </>
  );
};

export default Nav;
