import express from 'express';
import admin from 'firebase-admin';
import { Request, Response } from 'express';
import * as functions from 'firebase-functions';


admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(express.json());

// GET all feedback items
app.get('/feedback', async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('feedback').get();
    const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).send('Server error');
  }
});

// POST new feedback
app.post('/feedback', async (req, res) => {
  const { title, category, description } = req.body;
  const newFeedback = {
    title,
    category,
    description,
    status: 'suggestion',
    upvotes: 0,
    commentsCount: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const docRef = await db.collection('feedback').add(newFeedback);
  res.status(201).json({ id: docRef.id });
});

// POST upvote feedback
app.post('/feedback/:id/upvote', async (req, res) => {
  const ref = db.collection('feedback').doc(req.params.id);
  await ref.update({ upvotes: admin.firestore.FieldValue.increment(1) });
  res.status(200).send('Upvoted');
});

// POST comment or reply
app.post('/feedback/:id/comment', async (req, res) => {
  const { content, replyingTo, user } = req.body;
  const comment = {
    content,
    replyingTo: replyingTo || null,
    user,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  await db.collection('feedback')
    .doc(req.params.id)
    .collection('comments')
    .add(comment);
  await db.collection('feedback')
    .doc(req.params.id)
    .update({ commentsCount: admin.firestore.FieldValue.increment(1) });
  res.status(201).send('Comment added');
});

export const api = functions.https.onRequest(app);
