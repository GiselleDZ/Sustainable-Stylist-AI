import { useDispatch } from "react-redux";
import { useState } from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

import { blankMode, modes } from "./utils";
import { generateKey } from "../../utils";
import { setMode } from "../../Store/stylistChat";

type ModeType = {
  name: "Refine" | "Update" | "Build" | "";
  description: string;
};

const SelectMode = () => {
  const dispatch = useDispatch();

  const [selectedMode, setSelectedMode] = useState<ModeType>(blankMode);
  const [error, setError] = useState("");

  const chooseSelectedMode = (newMode: "Refine" | "Update" | "Build" | "") => {
    if (newMode === "") setError("Please choose a mode to continue.");
    else dispatch(setMode(newMode));
  };

  return (
    <VStack id="select-mode" width="100%" align="stretch" gap={3}>
      <Heading size="md">How can we help you with your style today?</Heading>
      <Text>Select the mode that best matches your needs</Text>
      {modes.map((m: ModeType, i) => (
        <Box key={generateKey(`mode-${i}`)}>
          <Button
            variant="outline"
            width="full"
            paddingY="6px"
            onClick={() =>
              setSelectedMode(selectedMode.name === m.name ? blankMode : m)
            }
          >
            {m.name}
          </Button>
          {selectedMode === m && <Text mt={2}>{m.description}</Text>}
        </Box>
      ))}
      {error && <Text color="red.500">{error}</Text>}
      <Button onClick={() => chooseSelectedMode(selectedMode.name)}>
        Get Styled!
      </Button>
    </VStack>
  );
};

export default SelectMode;
