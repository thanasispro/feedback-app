import { useState, useEffect, type FormEvent } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: 'userPool' });

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Schema['Feedback']['type'][]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchFeedbacks = async () => {
    const { data } = await client.models.Feedback.list();
    setFeedbacks(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await client.models.Feedback.create({ name, description });
    setName('');
    setDescription('');
    fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Amplify Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>

      <ul className="space-y-4">
        {feedbacks.map((f) => (
          <li key={f.id} className="border p-4 rounded">
            <h3 className="font-bold">{f.name}</h3>
            <p>{f.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
