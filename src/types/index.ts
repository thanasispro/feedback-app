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
  
  export interface Feedback {
    id: string;
    title: string;
    description: string;
    category?: string;
    status?: string;
    upvotes: number;
    comments?: Comment[];
  }
  
  export type FeedbackInput = Omit<Feedback, 'id' | 'upvotes' | 'comments'>;
  