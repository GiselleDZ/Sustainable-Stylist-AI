import { useState } from "react";

type UseInputProps = {
  initialValue: string;
  //   validationFn: Function | void;
  valueTransformer: Function | void;
};

const UseInput = ({
  initialValue,
  //   validationFn = () => true,
  valueTransformer = (val: string | number) => val,
}: UseInputProps) => {
  const [value, setValue] = useState(initialValue);
  //   const [valid, setValid] = useState(
  //     initialValue ? validationFn(initialValue) : false
  //   );
  const [active, setActive] = useState(false);
  return {
    value,
    // valid,
    active,
    setValue,
    reset: (v = "") => {
      setValue(v);
      //   if (v.length) setValid(validationFn(v));
    },
    bind: {
      // touched,
      value,
      //   valid,
      onChange: (
        event:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        // setValid(validationFn(event.target.value));
        setValue(valueTransformer(event.target.value));
        // setTouched(true);
        setActive(true);
      },
      onBlur: (
        event:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setActive(false);
        // setValid(validationFn(event.target.value));
      },
    },
  };
};

export default UseInput;
