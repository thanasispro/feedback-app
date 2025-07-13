import type { Feedback } from '../types';
import { Pill } from '../atoms/Pill/Pill';
import commentIcon from '@/assets/shared/icon-comments.svg';

interface FeedbackCardProps {
  feedback: Feedback & { upvotes: number; commentsCount: number; isUpvoted?: boolean };
  onUpvote: () => void;
}

export const FeedbackCard = ({ feedback, onUpvote }: FeedbackCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-4">
        <h3 className="font-bold text-lg text-neutral-gray-900">{feedback.title}</h3>
        <p className="text-sm text-neutral-gray-500">{feedback.description}</p>
        <Pill label={feedback.category} onClick={() => {}} className="self-start pointer-events-none" />
        <div className="flex justify-between items-center mt-2">
          <Pill
            label={feedback.upvotes}
            onClick={onUpvote}
            variant="upvote"
            isActive={feedback.isUpvoted}
          />
          <div className="flex items-center gap-2">
            <img src={commentIcon} alt="Comments" className="w-5 h-4" />
            <span className="font-bold text-sm text-neutral-gray-900">{feedback.commentsCount}</span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row items-start gap-10">
        <Pill
          label={feedback.upvotes}
          onClick={onUpvote}
          variant="upvote"
          isActive={feedback.isUpvoted}
        />
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-neutral-gray-900">{feedback.title}</h3>
          <p className="text-sm text-neutral-gray-500 mt-1">{feedback.description}</p>
          <Pill label={feedback.category} onClick={() => {}} className="mt-3 pointer-events-none" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={commentIcon} alt="Comments" className="w-5 h-4" />
          <span className="font-bold text-sm text-neutral-gray-900">{feedback.commentsCount}</span>
        </div>
      </div>
    </div>
  );
};
