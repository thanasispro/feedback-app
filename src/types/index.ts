export interface User {
    id: string;
    username: string;
    name: string;
    image: string;
  }
  
  export interface Comment {
    id: string;
    content: string;
    user: User;
    replyingTo?: string;
    replies?: Comment[];
  }
  
  export type Category = 'UI' | 'UX' | 'Enhancement' | 'Feature' | 'Bug';
  export type Status = 'Suggestion' | 'Planned' | 'InProgress' | 'Live';

  export interface Feedback {
    id: string;
    title: string;
    description: string;
    category: Category;
    status: Status;
    upvotes: number;
    comments?: Comment[];
  }
  export type FeedbackInput = Omit<Feedback, 'id' | 'upvotes' | 'comments'>;
  