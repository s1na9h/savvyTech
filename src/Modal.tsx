import { X } from "lucide-react";
import React, { useEffect } from "react";

export default function Modal({
  open = false,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
}) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div></div>
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {onClose && (
              <X
                size={24}
                onClick={onClose}
                className=" text-gray-400 hover:text-gray-600 transition-colors duration-200"
              />
            )}
          </div>
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
