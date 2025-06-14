import { useEffect, useState } from 'react';

type Feedback = {
  id: string;
  message: string;
};

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [message, setMessage] = useState('');

  // Fetch feedback on load
  useEffect(() => {
    fetch('/api/feedback') // or your Firebase Function URL
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
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setFeedbacks((prev) => [...prev, newItem]);
      setMessage('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feedback Board</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your feedback..."
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
            {f.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
