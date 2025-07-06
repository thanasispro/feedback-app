import { useEffect, useState } from 'react';

type Feedback = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  upvotes: number;
  commentsCount: number;
};

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Fetch feedback on load
  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then(setFeedbacks)
      .catch((err) => console.error('Error fetching feedbacks:', err));
  }, []);

  // Post feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, description }),
    });

    if (res.ok) {
      // Refresh the list after adding
      const updatedRes = await fetch('/api/feedback');
      const updatedFeedbacks = await updatedRes.json();
      setFeedbacks(updatedFeedbacks);
      setTitle('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feedback Board</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category..."
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <ul>
        {feedbacks.map((f) => (
          <li key={f.id} className="border-b py-2">
            <h3 className="font-bold">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.category}</p>
            <p>{f.description}</p>
            <p className="text-xs text-gray-500">
              {f.upvotes} upvotes • {f.commentsCount} comments • {f.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;