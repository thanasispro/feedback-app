import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { Feedback, FeedbackInput } from '../types';

const client = generateClient<Schema>({ authMode: 'userPool' });

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    const { data } = await client.models.Feedback.list();

    // Filter and map out nulls and sanitize structure
    const cleaned = (data ?? [])
      .filter((f): f is NonNullable<typeof f> => !!f && !!f.id)
      .map((f): Feedback => ({
        id: f.id,
        title: f.title ?? '',
        description: f.description ?? '',
        category: f.category ?? '',
        status: f.status ?? '',
        upvotes: f.upvotes ?? 0,
        comments: []
      }));

    setFeedbacks(cleaned);
  };

  const addFeedback = async (data: FeedbackInput) => {
    await client.models.Feedback.create({ ...data, upvotes: 0 });
    await fetchFeedbacks();
  };

  const updateFeedback = async (updated: Feedback) => {
    await client.models.Feedback.update({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      category: updated.category,
      status: updated.status,
      upvotes: updated.upvotes,
    });
    await fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return { feedbacks, addFeedback, updateFeedback };
}
