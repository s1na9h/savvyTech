import { Plus } from "lucide-react";
import { useState } from "react";
import Form from "./components/Form";
import Modal from "./Modal";
import Button from "./components/Button";
import ListContainer from "./components/ListContainer";
import ListItem from "./components/ListItem";

export type item = {
  title: string;
  id: string;
  subtitle: string;
  createdAt: string;
};

const App = () => {
  const [items, setItems] = useState<item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<item | null>(null);

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (item: item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (
    values: Omit<item, "id" | "createdAt"> & { id?: string; createdAt?: string }
  ) => {
    if (values.id) {
      setItems(
        items.map((item) =>
          item.id === (values.id as string) ? (values as item) : item
        )
      );
    } else {
      const timestamp = new Date().toISOString();
      const newItem = { ...values, id: timestamp, createdAt: timestamp };
      setItems([...items, newItem]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <header className="bg-sky-300 sticky top-0 shadow-sm">
        <div className="max-w-4xl p-4 mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                List Manager
              </h1>
              {/* <p className="text-gray-600">Create, edit, and manage your items</p> */}
            </div>

            <Button
              onClick={openCreateModal}
              theme="primary"
              className="flex gap-1 items-center sticky top-4"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {items.length === 0 ? (
          <p className="text-gray-500 text-lg text-center py-12">
            Add your first item
          </p>
        ) : (
          <ListContainer>
            {items.map((item) => (
              <ListItem
                item={item}
                onDelete={(item) => handleDelete(item.id)}
                onEdit={(item) => {
                  openEditModal(item);
                }}
              />
            ))}
          </ListContainer>
        )}

        <Modal
          onClose={closeModal}
          title={currentItem ? "Edit Item" : "Create New Item"}
          open={isModalOpen}
        >
          <Form
            onSubmit={handleSubmit}
            onCancel={closeModal}
            currentItem={currentItem}
          />
        </Modal>
      </div>
    </div>
  );
};

export default App;
