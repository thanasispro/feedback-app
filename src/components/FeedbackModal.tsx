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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
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
    // Clear errors when modal opens/closes
    setErrors({
      title: "",
      description: "",
      category: "",
    });
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategorySelect = (selected: string) => {
    setFormData((prev) => ({ ...prev, category: selected }));
    // Clear error when user selects category
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleStatusSelect = (selectedLabel: string) => {
    const found = statusOptions.find((o) => o.label === selectedLabel);
    if (found) {
      setFormData((prev) => ({ ...prev, status: found.value }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      category: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const currentStatusLabel =
    statusOptions.find((o) => o.value === formData.status)?.label || "Suggestion";

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

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
            placeholder="Add a short, descriptive headline"
            label="Feedback Title"
            description="Add a short, descriptive headline"
            required
            error={errors.title}
          />

           <Dropdown
            value={formData.category || "Select category"}
            options={categoryOptions}
            onSelect={handleCategorySelect}
            label="Category"
            description="Choose a category for your feedback"
            required
            error={errors.category}
          />
          
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Include any specific comments on what should be improved, added, etc."
            label="Feedback Detail"
            description="Include any specific comments on what should be improved, added, etc."
            required
            error={errors.description}
          />
          
         
          
          {initialData && (
            <Dropdown
              value={currentStatusLabel}
              options={statusOptions.map((o) => o.label)}
              onSelect={handleStatusSelect}
              label="Update Status"
              description="Change feature state"
            />
          )}
          
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