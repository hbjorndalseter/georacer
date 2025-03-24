import { useState } from 'react';

export default function QuestionModal({ task, onSubmit, onClose }) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="absolute top-1/5 right-1/4 z-1500 w-[320px] bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4">
      <h2 className="text-lg text-black font-semibold mb-2">{task.question}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          className="p-2 border text-black border-gray-300 rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
