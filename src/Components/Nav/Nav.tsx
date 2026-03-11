import { useLocation, Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import routes from "../../Routing/routes";
import Tab from "./Tab";
import { generateKey } from "../../utils";

const Nav = () => {
  const location = useLocation();

  return (
    <>
      <Flex
        as="nav"
        position="fixed"
        zIndex={10}
        height="100%"
        left={0}
        top={0}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {routes.map((tab: { path: string }, i: number) => (
          <Tab path={tab.path} key={generateKey(`NavTab_${i}`)} />
        ))}
      </Flex>
      {location.pathname !== "/" && (
        <Link
          to="/"
          style={{
            position: "fixed",
            right: "20px",
            top: "20px",
            fontSize: "16px",
            fontWeight: "600",
            textDecoration: "none",
            color: "var(--fg-color)",
          }}
        >
          X
        </Link>
      )}
    </>
  );
};

export default Nav;
