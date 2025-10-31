import { useState } from "react";

type props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> & { label?: string };

export default function Input(props: props) {
  const [isToched, setIsToched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const { label, ...inputProps } = props;

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setIsToched(true);
      if (!e.target.value.trim()) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      props?.onChange?.(e);
    }
  

  return (
    <div>
      <label
        htmlFor={inputProps?.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        {...inputProps}
        onBlur={(e) => {setIsToched(true);inputProps.onBlur?.(e)}}
        onChange={changeHandler}
        type="text"
        className={`w-full px-4 py-3 border outline-0 border-gray-300 rounded-lg focus:ring-2 ${
          isEmpty && isToched ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        }  focus:border-transparent transition-all duration-200`}
      />
      {isEmpty && isToched ? (
        <span className="text-red-500">{inputProps.name || "this field"} is required</span>
      ) : null}
    </div>
  );
}
