import axios from "axios";
import { KeyboardEvent, useEffect } from "react";
import type { RootState } from "../../Store/store";
import { useDispatch, connect } from "react-redux";
import { addMessages, addSummary } from "../../Store/stylistChat";

import UseInput from "../Hooks/UseInput";
import "./stylist.css";
import { generateKey } from "../../utils";

type StylistChatProps = {
  messages: Array<Object>;
  summary: string;
};

const StylistChat = ({ messages, summary }: StylistChatProps) => {
  const dispatch = useDispatch();

  let initialFetched = false;

  let initialValue = "";
  const {
    value: message,
    bind: bindMessage,
    reset: resetToInitialVal,
  } = UseInput({
    initialValue,
    valueTransformer: undefined,
  });

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    const anchorTop = document.getElementById("anchor")?.offsetTop;
    if (!!chatbox && !!anchorTop && anchorTop > chatbox?.clientHeight)
      chatbox.scrollTop = anchorTop;
  }, [messages]);

  useEffect(() => {
    if (!messages.length && !initialFetched) {
      initialFetched = true;
      fetchStylistMessage(null);
    }
  }, []);

  const getConversationSummary = async (msg: object) => {
    try {
      const msgsToSum = !summary.length
        ? messages
        : [messages[messages.length - 1]];

      const res = await axios.get(`http://10.0.0.168:8000/stylist-summary`, {
        params: {
          messages: [...msgsToSum, msg],
          summary,
        },
      });
      dispatch(addSummary(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStylistMessage = async (msg: object | null) => {
    try {
      const msgs = !!msg ? [...messages, msg] : messages;

      const res = await axios.get(`http://10.0.0.168:8000/stylist`, {
        params: {
          messages: msgs,
          summary: summary,
        },
      });
      getConversationSummary({ role: "assistant", content: res.data });
      dispatch(addMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const submitMessage = async (
    e: React.ChangeEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const newMsg = { role: "user", content: message };
    e.preventDefault();
    dispatch(addMessages([newMsg]));
    fetchStylistMessage(newMsg);
    resetToInitialVal();
  };

  return (
    <>
      <section id="stylist-chat">
        <h3 id="stylist-header">Chat with our AI Style Assistant</h3>
        <div id="stylist-fadeout" />
        <div id="chatbox">
          {messages.map((m: any, i: number) => (
            <div key={generateKey(`stylistMsg_${i}`)}>
              <p className={`chat-message ${m.role}`}>{m.content}</p>
            </div>
          ))}
          <div id="anchor"></div>
        </div>
        <form
          onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
            submitMessage(event)
          }
        >
          <div className="text-input">
            <textarea
              required
              placeholder="Your response..."
              id="textinput"
              {...bindMessage}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
                e.key === "Enter" && submitMessage(e)
              }
            />
            <label htmlFor="#textinput" id="input-label">
              Enter to Submit
            </label>
          </div>
        </form>
      </section>
    </>
  );
};

export default connect((state: RootState) => {
  const { stylistChat } = state;
  return { messages: stylistChat.messages, summary: stylistChat.summary };
})(StylistChat);
