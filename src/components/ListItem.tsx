import { Edit3, Trash2 } from "lucide-react";
import type { item } from "../App";

type props = {
  item: item;
  onEdit: (item: item) => unknown;
  onDelete: (item: item) => unknown;
};

export default function ListItem(props: props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleDragEnd(e: React.DragEvent) {
    e.currentTarget.classList.remove("opacity-50", "dragging");
  }

  function handleDrageStart(e: React.DragEvent) {
    e.currentTarget.classList.add("opacity-50", "dragging");
  }

  return (
    <div
      onDragStart={handleDrageStart}
      onDragEnd={handleDragEnd}
      className="draggable bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100"
      draggable
    >
      <div className="flex justify-between items-stretch">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {props.item.title}
            </h3>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {formatDate(props.item.createdAt)}
            </span>
          </div>
          <p className="text-gray-600 whitespace-pre">{props.item.subtitle}</p>
        </div>
        <div className="flex gap-2 ml-4 h-full">
          <button
            onClick={() => {
              props.onEdit(props.item);
            }}
            className="p-2 h-full text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit"
          >
            <Edit3 className="h-full" />
          </button>
          <button
            onClick={() => {
              props.onDelete(props.item);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
