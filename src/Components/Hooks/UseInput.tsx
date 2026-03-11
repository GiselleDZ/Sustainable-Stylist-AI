import { useState } from "react";

type UseInputProps = {
  initialValue: string;
  valueTransformer?: (val: string) => string;
};

const UseInput = ({
  initialValue,
  valueTransformer = (val: string) => val,
}: UseInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [active, setActive] = useState(false);
  return {
    value,
    active,
    setValue,
    reset: (v = "") => {
      setValue(v);
    },
    bind: {
      value,
      onChange: (
        event:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setValue(valueTransformer(event.target.value));
        setActive(true);
      },
      onBlur: (
        _event:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setActive(false);
      },
    },
  };
};

export default UseInput;
