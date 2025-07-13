import { FeedbackCard } from './FeedbackCard';
import type { Feedback } from '@/types';

interface FeedbackListProps {
  feedbacks: (Feedback & { upvotes: number; commentsCount: number; isUpvoted?: boolean })[];
  onUpvote: (feedbackId: string) => void;
}

export const FeedbackList = ({ feedbacks, onUpvote }: FeedbackListProps) => {
  if (feedbacks.length === 0) {
    return <p className="text-center text-neutral-gray-500">No feedbacks yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {feedbacks.map((fb) => (
        <FeedbackCard key={fb.id} feedback={fb} onUpvote={() => onUpvote(fb.id)} />
      ))}
    </div>
  );
};
