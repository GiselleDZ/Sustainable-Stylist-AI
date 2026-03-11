import axios from "axios";
import { KeyboardEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Textarea } from "@chakra-ui/react";

import type { RootState } from "../../Store/store";
import { addMessages } from "../../Store/stylistChat";
import type { Message } from "../../types";
import UseInput from "../Hooks/UseInput";
import { generateKey } from "../../utils";

const StylistChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.stylistChat.messages
  );
  const initialFetched = useRef(false);

  const {
    value: message,
    bind: bindMessage,
    reset: resetToInitialVal,
  } = UseInput({
    initialValue: "",
    valueTransformer: undefined,
  });

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    const anchorTop = document.getElementById("anchor")?.offsetTop;
    if (chatbox && anchorTop && anchorTop > chatbox.clientHeight) {
      chatbox.scrollTop = anchorTop;
    }
  }, [messages]);

  useEffect(() => {
    if (!initialFetched.current && messages.length === 0) {
      initialFetched.current = true;
      fetchStylistMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStylistMessage = async (msg: Message | null) => {
    try {
      const msgs = msg ? [...messages, msg] : messages;
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/stylist/stylist`,
        { messages: msgs }
      );
      dispatch(addMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const submitMessage = async (
    e: React.FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const newMsg: Message = { role: "user", content: message };
    dispatch(addMessages([newMsg]));
    fetchStylistMessage(newMsg);
    resetToInitialVal();
  };

  return (
    <Box
      as="section"
      id="stylist-chat"
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      minHeight="500px"
      border="1px solid var(--fg-color)"
      padding="20px"
      fontSize="14px"
      position="relative"
    >
      <Text
        fontWeight="600"
        textAlign="left"
        mb="10px"
        position="relative"
        zIndex={2}
      >
        Chat with our AI Style Assistant
      </Text>
      <Box
        position="absolute"
        width="285px"
        height="50px"
        top="100px"
        background="linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"
      />
      <Box
        id="chatbox"
        width={{ base: "250px", md: "300px" }}
        height="600px"
        textAlign="right"
        overflowY="scroll"
        style={{ overflowAnchor: "none", scrollBehavior: "smooth" }}
      >
        {messages.map((m: Message, i: number) => (
          <Box key={generateKey(`stylistMsg_${i}`)}>
            <Text
              textAlign="left"
              paddingY="5px"
              fontWeight={m.role === "user" ? 500 : 400}
            >
              {m.content}
            </Text>
          </Box>
        ))}
        <Box id="anchor" style={{ overflowAnchor: "auto", height: "1px" }} />
      </Box>
      <form onSubmit={submitMessage}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignContent="flex-start"
          textAlign="left"
          marginTop="20px"
          position="relative"
        >
          <Textarea
            required
            placeholder="Your response..."
            id="textinput"
            {...bindMessage}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
              e.key === "Enter" && submitMessage(e)
            }
            height="80px"
            width={{ base: "138%", md: "155%" }}
            padding="5px"
            marginBottom="20px"
          />
          <label
            htmlFor="textinput"
            style={{
              position: "absolute",
              fontSize: "x-small",
              margin: "-10px 0 20px 15px",
            }}
          >
            Enter to Submit
          </label>
        </Box>
      </form>
    </Box>
  );
};

export default StylistChat;
