import axios from "axios";
import { KeyboardEvent, useEffect } from "react";
import type { RootState } from "../../Store/store";
import { useDispatch, connect } from "react-redux";
import { addMessages } from "../../Store/stylistChat";

import UseInput from "../Hooks/UseInput";
import "./stylist.css";

type StylistChatProps = {
  messages: Array<Object>;
};

const StylistChat = ({ messages }: StylistChatProps) => {
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
      // console.log("INDDEED MESSAGES IS EMPTY", message);
      initialFetched = true;
      fetchStylistMessage(null);
    }
  }, []);

  const fetchStylistMessage = async (msg: string | null) => {
    try {
      const msgs = !!message
        ? [...messages, { role: "user", content: msg }]
        : messages;
      console.log(messages.length, messages);
      const res = await axios.get(`http://192.168.1.193:8000/stylist`, {
        params: {
          messages: msgs,
        },
      });
      dispatch(addMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const submitMessage = (
    e: React.ChangeEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    dispatch(addMessages([{ role: "user", content: message }]));
    fetchStylistMessage(message);
    resetToInitialVal();
  };

  return (
    <section className="stylist">
      <h1>Stylist Chat</h1>
      <div id="chatbox">
        {messages.map((m: any, i: number) => (
          <div key={i}>
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
            rows={5}
            cols={34}
            id="textinput"
            {...bindMessage}
            onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
              e.key === "Enter" && submitMessage(e)
            }
          />
          <label htmlFor="#textinput">Enter to submit</label>
          {/* <button type="submit">SUBMIT</button> */}
        </div>
      </form>
    </section>
  );
};

export default connect((state: RootState) => {
  const { stylistChat } = state;
  return { messages: stylistChat.messages };
})(StylistChat);
