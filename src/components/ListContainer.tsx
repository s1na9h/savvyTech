export default function ListContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  function dragOverHandler(e: React.DragEvent) {
    e.preventDefault();
    const draggingElement = e.currentTarget.querySelector(".dragging")!;
    const draggables = [...e.currentTarget.children];
    const y = e.clientY;
    const afterElement = draggables.reduce<{
      offset: number;
      element?: Element;
    }>(
      (acc, draggable) => {
        const rect = draggable.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;
        const offset = y - middle;
        if (offset < 0 && offset > acc.offset) {
          return { offset, element: draggable };
        } else {
          return acc;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    )?.element;

    if (!afterElement) {
      e.currentTarget.appendChild(draggingElement);
    } else {
      e.currentTarget.insertBefore(draggingElement, afterElement);
    }
  }

  return (
    <div
      className="space-y-4"
      onDragOver={dragOverHandler}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
