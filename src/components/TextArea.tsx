type props = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  label?: string;
};

export default function TextArea(props: props) {
  const { label, ...textareaProps } = props;

  return (
    <div>
      <label
        htmlFor={textareaProps?.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <textarea
        {...textareaProps}
        className="w-full px-4 py-3 border outline-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    </div>
  );
}
