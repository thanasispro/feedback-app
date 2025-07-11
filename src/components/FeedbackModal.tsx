import { useState, useEffect } from 'react';
import type { Feedback } from '@/types';
import { TextField } from '@/atoms/TextField/TextField';
import { Button } from '@/atoms/Button/Button';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Feedback, 'id' | 'upvotes' | 'comments'>) => void;
  initialData?: Feedback | null;
}

export const FeedbackModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: FeedbackModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? 'Edit Feedback' : 'Add Feedback'}
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
          <TextField
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (optional)"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button text="Cancel" variant="ghost" color="gray" onClick={onClose} />
            <Button text="Save" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
