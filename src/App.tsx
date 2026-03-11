import { Box } from "@chakra-ui/react";
import Nav from "./Components/Nav/Nav";
import MainRouter from "./Routing/MainRouter";

function App() {
  return (
    <Box minH="100vh">
      <Nav />
      <MainRouter />
    </Box>
  );
}

export default App;
