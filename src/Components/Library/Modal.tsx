import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={10}
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "var(--bg-color)",
      }}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="300px"
        borderRadius="8px"
        padding="20px"
        style={{
          backgroundColor: "var(--secondary-accent)",
          color: "var(--fg-color)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Modal;
