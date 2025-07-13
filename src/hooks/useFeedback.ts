import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import type { Feedback, FeedbackInput } from "../types";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>({ authMode: "userPool" });

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<Map<string, string>>(new Map());

  const fetchFeedbacks = useCallback(async () => {
    try {
      const { userId } = await getCurrentUser();
      const [feedbackData, upvotesData] = await Promise.all([
        client.models.Feedback.list(),
        client.models.Upvote.list({ filter: { userId: { eq: userId } } })
      ]);

      const upvoteMap = new Map(upvotesData.data.map(uv => [uv.feedbackId, uv.id]));
      setUserUpvotes(upvoteMap);

      const cleaned = (feedbackData.data ?? [])
        .filter((f): f is NonNullable<typeof f> => !!f && !!f.id)
        .map((f): Feedback => ({
          id: f.id,
          title: f.title ?? "",
          description: f.description ?? "",
          category: f.category ?? "UI",
          status: f.status ?? "Suggestion",
          upvotes: f.upvotes ?? 0,
          comments: [],
          isUpvoted: upvoteMap.has(f.id),
        }));
      setFeedbacks(cleaned);
    } catch (error) {
      console.error("Error fetching feedbacks or user upvotes:", error);
    }
  }, []);

  const toggleUpvote = async (feedbackId: string) => {
    const feedback = feedbacks.find((f) => f.id === feedbackId);
    if (!feedback) return;

    const isCurrentlyUpvoted = userUpvotes.has(feedbackId);
    const newUpvotes = isCurrentlyUpvoted ? feedback.upvotes - 1 : feedback.upvotes + 1;

    // Optimistic UI update
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === feedbackId
          ? { ...f, upvotes: newUpvotes, isUpvoted: !isCurrentlyUpvoted }
          : f
      )
    );
    
    const newUpvoteMap = new Map(userUpvotes);

    try {
      if (isCurrentlyUpvoted) {
        const upvoteId = userUpvotes.get(feedbackId);
        if (upvoteId) {
          await client.models.Upvote.delete({ id: upvoteId });
          newUpvoteMap.delete(feedbackId);
        }
      } else {
        const { userId } = await getCurrentUser();
        const { data: newUpvote } = await client.models.Upvote.create({ feedbackId, userId });
        if (newUpvote) newUpvoteMap.set(feedbackId, newUpvote.id);
      }
      setUserUpvotes(newUpvoteMap);
      await client.models.Feedback.update({ id: feedbackId, upvotes: newUpvotes });
    } catch (error) {
      console.error("Failed to toggle upvote:", error);
      // Revert UI on failure
      setFeedbacks(
        feedbacks.map((f) => (f.id === feedbackId ? feedback : f))
      );
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

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
    });
    await fetchFeedbacks();
  };

  const deleteFeedback = async (id: string) => {
    await client.models.Feedback.delete({ id });
    await fetchFeedbacks();
  };

  return { feedbacks, addFeedback, updateFeedback, deleteFeedback, toggleUpvote };
}