import { connect, useDispatch } from "react-redux";
import { useState } from "react";

import { RootState } from "../../Store/store";
import { blankMode, modes } from "./utils";
import { generateKey } from "../../utils";
import { setMode } from "../../Store/stylistChat";

type SelectModeProps = {
  mode: "Refine" | "Update" | "Build" | "";
};

type ModeType = {
  name: "Refine" | "Update" | "Build" | "";
  description: string;
};

const SelectMode = ({ mode }: SelectModeProps) => {
  const dispatch = useDispatch();

  const [selectedMode, setSelectedMode] = useState<ModeType>(blankMode);
  const [error, setError] = useState("");

  const chooseSelectedMode = (newMode: "Refine" | "Update" | "Build" | "") => {
    if (newMode === "") setError("Please choose a mode to continue.");
    else dispatch(setMode(newMode));
  };

  return (
    <div id="select-mode">
      <h2>How can we help you with your style today?</h2>
      <h5>Select the mode that best matches your needs</h5>
      {modes.map((m: ModeType, i) => (
        <div className="mode" key={generateKey(`mode-${i}`)}>
          <button
            type="button"
            className="btn-secondary btn-mode"
            onClick={() =>
              setSelectedMode(selectedMode.name === m.name ? blankMode : m)
            }
          >
            {m.name}
          </button>
          {selectedMode === m && <p>{m.description}</p>}
        </div>
      ))}
      {error && <p className="navigation-error">{error}</p>}
      <button
        className="btn-tertiary"
        onClick={() => chooseSelectedMode(selectedMode.name)}
      >
        Get Styled!
      </button>
    </div>
  );
};

export default connect((state: RootState) => {
  return {
    mode: state.stylistChat.mode,
  };
})(SelectMode);
