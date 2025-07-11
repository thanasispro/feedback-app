import type { Feedback } from '../types';
import { Button } from '../atoms/Button/Button';

interface FeedbackCardProps {
  feedback: Feedback;
  onEdit: () => void;
}

export const FeedbackCard = ({ feedback, onEdit }: FeedbackCardProps) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-neutral-gray-900">{feedback.title}</h3>
        <Button text="Edit" variant="ghost" color="blue" onClick={onEdit} />
      </div>
      <p className="text-sm text-neutral-gray-500">{feedback.description}</p>
      {feedback.category && (
        <span className="text-xs text-neutral-gray-400 italic">#{feedback.category}</span>
      )}
    </div>
  );
};
