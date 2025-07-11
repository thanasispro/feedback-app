import { useState, useEffect } from "react";
import { TextField } from "../atoms/TextField/TextField";
import { Button } from "../atoms/Button/Button";
import { Dropdown } from "../atoms/Dropdown/Dropdown";
import type { Feedback } from "../types";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Feedback, "id" | "upvotes" | "comments">) => void;
  initialData?: Feedback | null;
}

const categoryOptions = ["UI", "UX", "Enhancement", "Feature", "Bug"];

const statusOptions = [
  { label: "Suggestion", value: "Suggestion" },
  { label: "Planned", value: "Planned" },
  { label: "In Progress", value: "InProgress" },
  { label: "Live", value: "Live" },
];

export const FeedbackModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: FeedbackModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Suggestion",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category || "",
        status: initialData.status || "Suggestion",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "Suggestion",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (selected: string) => {
    setFormData((prev) => ({ ...prev, category: selected }));
  };

  const handleStatusSelect = (selectedLabel: string) => {
    const found = statusOptions.find((o) => o.label === selectedLabel);
    if (found) {
      setFormData((prev) => ({ ...prev, status: found.value }));
    }
  };

  const currentStatusLabel =
    statusOptions.find((o) => o.value === formData.status)?.label || "Suggestion";

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({
      ...formData,
      category: formData.category as Feedback['category'],
      status: formData.status as Feedback['status'],
    });
    onClose();
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Feedback" : "Add Feedback"}
        </h2>
        <div className="flex flex-col gap-4">
          <TextField
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Dropdown
            value={formData.category || "Select category"}
            options={categoryOptions}
            onSelect={handleCategorySelect}
          />
          {
            initialData && 
            <Dropdown
                value={currentStatusLabel}
                options={statusOptions.map((o) => o.label)}
                onSelect={handleStatusSelect}
            />
          }
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              text="Cancel"
              variant="ghost"
              color="gray"
              onClick={onClose}
            />
            <Button text="Save" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
