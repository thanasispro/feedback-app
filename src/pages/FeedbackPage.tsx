import { useState } from 'react';
import { FeedbackModal } from '@/components/FeedbackModal';
import { FeedbackList } from '@/components/FeedbackList';
import { Button } from '../atoms/Button/Button';
import type { Feedback, FeedbackInput } from '../types';
import { useFeedbacks } from '@/hooks/useFeedback';


export const FeedbackPage = () => {
    const { feedbacks, addFeedback, updateFeedback } = useFeedbacks();
    const [editing, setEditing] = useState<Feedback | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = (data: FeedbackInput) => {
    if (editing) {
      updateFeedback({ ...editing, ...data });
    } else {
      addFeedback(data);
    }
    setEditing(null);
    setModalOpen(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Feedback Board</h1>
        <Button text="Add Feedback" onClick={() => setModalOpen(true)} />
      </div>

      <FeedbackList
        feedbacks={feedbacks}
        onEdit={(fb) => {
          setEditing(fb);
          setModalOpen(true);
        }}
      />

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
};
