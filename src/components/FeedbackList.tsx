import { FeedbackCard } from './FeedbackCard';
import type { Feedback } from '@/types';

interface FeedbackListProps {
  feedbacks: Feedback[];
  onEdit: (feedback: Feedback) => void;
}

export const FeedbackList = ({ feedbacks, onEdit }: FeedbackListProps) => {
  if (feedbacks.length === 0) {
    return <p className="text-center text-neutral-gray-500">No feedbacks yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {feedbacks.map((fb) => (
        <FeedbackCard feedback={fb} onEdit={() => onEdit(fb)} />
      ))}
    </div>
  );
};
