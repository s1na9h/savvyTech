import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: "primary" | "secondary";
    children?: React.ReactNode;
  }
) {
  const { theme, children, className ,...buttonProps } = props;

  const colorClasses =
    theme === "primary"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "text-gray-700 bg-gray-100 hover:bg-gray-200";

  return (
    <button
      {...buttonProps}
      className={`${colorClasses} px-4 py-3 disabled:bg-blue-100 disabled:text-slate-500 disabled:cursor-not-allowed  rounded-lg font-medium transition-colors duration-20 ${className}`}
    >
      {children}
    </button>
  );
}
