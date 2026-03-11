import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

import { RootState } from "../../Store/store";
import ResultSearchOptions from "./ResultSearchOptions";
import StylistChat from "./StylistChat";
import Modal from "../Library/Modal";
import SelectMode from "./SelectMode";

const Stylist = () => {
  const mode = useSelector((state: RootState) => state.stylistChat.mode);

  return (
    <Box id="stylist-page" position="relative">
      {!mode && (
        <Modal>
          <SelectMode />
        </Modal>
      )}
      <Box
        id="stylist"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="flex-start"
        justifyContent="space-between"
        margin="50px 0"
      >
        <StylistChat />
        <ResultSearchOptions />
      </Box>
    </Box>
  );
};

export default Stylist;
