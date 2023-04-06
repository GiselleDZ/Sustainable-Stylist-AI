import { connect } from "react-redux";
import { RootState } from "../../Store/store";
import ResultSearchOptions from "./ResultSearchOptions";
import StylistChat from "./StylistChat";
import "./stylist.css";
import Modal from "../Library/Modal";

type StylistProps = {
  mode: string;
};

const Stylist = ({ mode }: StylistProps) => {
  return (
    <div id="stylist-page">
      {!mode && <Modal>Hello this is hopefully a modal</Modal>}
      <div id="stylist">
        <StylistChat />
        <ResultSearchOptions />
      </div>
    </div>
  );
};

export default connect((state: RootState) => {
  const { stylistChat } = state;
  return {
    mode: stylistChat.mode,
  };
})(Stylist);
