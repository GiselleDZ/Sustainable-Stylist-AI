import { NavLink } from "react-router-dom";
import { Text } from "@chakra-ui/react";

type TabProps = {
  path: string;
};

const Tab = ({ path }: TabProps) => {
  const tabName = path.slice(1);

  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-color)",
        textDecoration: "none",
        width: "35px",
        ...(isActive
          ? { boxShadow: "inset 18px -3px 18px -18px rgba(0, 0, 0, 0.1)" }
          : {
              borderWidth: "0.5px 1px 0.5px 0",
              borderColor: "var(--fg-color)",
              borderStyle: "solid",
              borderRadius: "0 8px 8px 0",
              boxShadow: "11px -1px 18px -6px rgba(0, 0, 0, 0.1)",
            }),
      })}
    >
      <Text
        style={{
          fontFamily: '"Open Sans", sans-serif',
          writingMode: "vertical-rl",
          textOrientation: "upright",
          textTransform: "uppercase",
          color: "var(--fg-color)",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {tabName || "HOME"}
      </Text>
    </NavLink>
  );
};

export default Tab;
