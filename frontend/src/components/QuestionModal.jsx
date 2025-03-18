// QuestionModal.jsx
import { useState } from 'react';

export default function QuestionModal({ task, onSubmit, onClose }) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.question}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button type="submit">Submit Answer</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}