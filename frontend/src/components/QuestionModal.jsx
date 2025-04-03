import { useState } from 'react';

export default function QuestionModal({ task, onSubmit, onClose }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCorrect = await onSubmit(userAnswer);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setUserAnswer('');
    setTimeout(() => {
      setFadeOut(true);
    }, 500); // wait before fading out

    setTimeout(() => {
      setFeedback(null);
      setFadeOut(false);
      onClose(); // finally trigger removal after animation
    }, 1500); // total delay before unmount
  };
  return (
    <div
      className={`
        absolute bottom-8 left-1/2 -translate-x-1/2 z-999 w-[360px] p-5
        rounded-2xl shadow-2xl backdrop-blur-md text-white bg-[#0f172a]/90
        transition-all duration-500
        ${feedback === 'correct' ? 'border-4 border-green-400' : ''}
        ${feedback === 'wrong' ? 'border-4 border-red-500' : ''}
        ${fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      <h2 className="text-xl font-bold mb-2">🧠 Utfordring!</h2>
      <p className="mb-4">{task.question}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Skriv svaret ditt her..."
          className="flex-1 px-3 py-2 rounded-lg text-white bg-[#1e293b] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
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