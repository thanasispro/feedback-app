import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../atoms/TextField/TextField";
import { Button } from "../atoms/Button/Button";
import { Dropdown } from "../atoms/Dropdown/Dropdown";
import type { Feedback } from "../types";
import { useFeedbacks } from "@/hooks/useFeedback";

const categoryOptions = ["UI", "UX", "Enhancement", "Feature", "Bug"];

const statusOptions = [
  { label: "Suggestion", value: "Suggestion" },
  { label: "Planned", value: "Planned" },
  { label: "In Progress", value: "InProgress" },
  { label: "Live", value: "Live" },
];

export const FeedbackFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { feedbacks, addFeedback, updateFeedback, deleteFeedback } = useFeedbacks();
  
  const editingFeedback = id ? feedbacks.find(f => f.id === id) : null;
  const isEditing = Boolean(editingFeedback);

  const handleDelete = () => {
    if (editingFeedback) {
      deleteFeedback(editingFeedback.id);
      navigate('/');
    }
  };

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
    if (editingFeedback) {
      setFormData({
        title: editingFeedback.title,
        description: editingFeedback.description,
        category: editingFeedback.category || "",
        status: editingFeedback.status || "Suggestion",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "Suggestion",
      });
    }
    setErrors({
      title: "",
      description: "",
      category: "",
    });
  }, [editingFeedback]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategorySelect = (selected: string) => {
    setFormData((prev) => ({ ...prev, category: selected }));
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

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (isEditing && editingFeedback) {
      updateFeedback({ 
        ...editingFeedback, 
        ...formData,
        category: formData.category as Feedback['category'],
        status: formData.status as Feedback['status'],
      });
    } else {
      addFeedback({
        ...formData,
        category: formData.category as Feedback['category'],
        status: formData.status as Feedback['status'],
      });
    }
    navigate('/');
  };

  const currentStatusLabel =
    statusOptions.find((o) => o.value === formData.status)?.label || "Suggestion";

  return (
    <div className="min-h-screen bg-neutral-gray-100 p-6 md:p-10 lg:py-20 lg:px-15">
      <div className="max-w-md mx-auto md:max-w-lg lg:max-w-xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            text="← Go Back"
            variant="ghost"
            color="gray"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-neutral-gray-300">
            {isEditing ? "Edit Feedback" : "Create New Feedback"}
          </h1>

          <div className="flex flex-col gap-4 md:gap-6">
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
            
            {isEditing && (
              <Dropdown
                value={currentStatusLabel}
                options={statusOptions.map((o) => o.label)}
                onSelect={handleStatusSelect}
                label="Update Status"
                description="Change feature state"
              />
            )}
            
             
            <div className="flex flex-col md:flex-row justify-between gap-2 mt-4 md:mt-6">
              {isEditing && (
                <Button
                  text="Delete"
                  variant="primary"
                  color="orange"
                  onClick={handleDelete}
                  className="md:mr-auto"
                />
              )}
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto md:justify-end">
                <Button
                  text="Cancel"
                  variant="primary"
                  color="gray"
                  onClick={() => navigate('/')}
                />
                <Button 
                  text={isEditing ? "Save Changes" : "Add Feedback"} 
                  onClick={handleSubmit} 
                />
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};