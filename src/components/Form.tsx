import { useState } from "react";
import type { item } from "../App";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";

export default function Form({
  currentItem,
  onSubmit,
  onCancel,
}: {
  currentItem: item | null;
  onSubmit: (
    values: Omit<item, "id" | "createdAt"> & { id?: string; createdAt?: string }
  ) => void;
  onCancel: () => unknown;
}) {
  const [title, setTitle] = useState(currentItem ? currentItem.title : "");
  const [subtitle, setSubtitle] = useState(
    currentItem ? currentItem.subtitle : ""
  );

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if(!title.trim()){
      document.getElementById("title")?.focus();
      return;
    }
    onSubmit({ ...currentItem, title, subtitle });
  }

  return (
    <>
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
         name="tite"
          id="title"
          label="Title *"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter item title"
        />

        <TextArea
        name="subtitle"
          placeholder="Enter item subtitle (optional)"
          id="subtitle"
          label="Subtitle"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
          rows={3}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onCancel} theme="secondary" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" theme="primary" className="flex-1">
            {currentItem ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
}
