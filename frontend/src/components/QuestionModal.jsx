import { useState } from 'react';

export default function QuestionModal({ task, onSubmit, onClose }) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-[360px] bg-[#0f172a]/90 backdrop-blur-md text-white rounded-2xl shadow-2xl p-5">
      <h2 className="text-xl font-bold mb-2">🧠 Utfordring!</h2>
      <p className="mb-4">{task.question}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Skriv svaret ditt her..."
          className="flex-1 px-3 py-2 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Send inn
        </button>
      </form>
    </div>
  );
}