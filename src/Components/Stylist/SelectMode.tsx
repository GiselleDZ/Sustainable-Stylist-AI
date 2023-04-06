import { connect } from "react-redux";

import { RootState } from "../../Store/store";

type SelectModeProps = {
  mode: string;
};

const SelectMode = ({}: SelectModeProps) => {
  return <></>;
};

export default connect((state: RootState) => {
  return {
    mode: state.stylistChat.mode,
  };
}, {})(SelectMode);
