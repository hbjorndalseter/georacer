import { useState, useEffect } from "react";
import InteractiveMap from "../components/InteractiveMap";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../components/QuestionModal";
import { usePlayer } from "../context/PlayerContext";
import { updateScore } from "../utils/updateScore";

export default function GamePage() {

  const { player, updatePlayerScore } = usePlayer();
  const navigate = useNavigate();
  const mapId = player?.cityMapId; 
  const [factQuestions, setFactQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [checkpointNode, setCheckpointNode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  // Get fact questions for the current map when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => {
        setFactQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching fact questions:", error);
      });
  }, []);

  // Set the first question and fetch the next checkpoint node when factQuestions is initialized
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      fetch(`http://localhost:3000/api/roadnet/${mapId}/${firstQuestion.nodeId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Next checkpoint node fetched:", data);
          setCheckpointNode(data);
        })
        .catch((error) => {
          console.error("Error fetching next checkpoint node:", error);
        });
    }
  }, [factQuestions]);

  // Handle checkpoint reached event
  const handleCheckpointReached = () => {
    setShowModal(true);
  }

  // Handle answer submission in the modal
  const handleAnswerSubmit = async (userAnswer) => {
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase()
    ) {
      alert(`Correct! You've earned ${currentQuestion.score} points. Points added to user ${player.name}`);
      const newScore = currentScore + currentQuestion.score;
      setCurrentScore(newScore);

      const currentIndex = factQuestions.indexOf(currentQuestion);
      const nextQuestionIndex = currentIndex + 1;
      if (nextQuestionIndex < factQuestions.length) {
        const nextQuestion = factQuestions[nextQuestionIndex];
        setCurrentQuestion(nextQuestion);
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${nextQuestion.nodeId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Next checkpoint node fetched:", data);
            setCheckpointNode(data);
          })
          .catch((error) => {
            console.error("Error fetching next checkpoint node:", error);
          });
      } else {
        await updateScore(player, newScore);
        updatePlayerScore(newScore);
        navigate("/"); // Navigate to the results page if no more questions
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
    setShowModal(false);
  };

  return (
    <div className="w-screen h-screen bg-[#1b325e] justify-around items-center flex flex-col">
      <h1>GamePage</h1>
      {currentQuestion && <InteractiveMap mapId={mapId} checkpointNode={checkpointNode} onCheckpointReached={handleCheckpointReached} />}
      {showModal && currentQuestion && (
        <QuestionModal
          task={currentQuestion}
          onSubmit={handleAnswerSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};