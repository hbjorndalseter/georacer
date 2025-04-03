import { useState, useEffect } from "react";
import InteractiveMap from "../components/InteractiveMap";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../components/QuestionModal";
import { usePlayer } from "../context/PlayerContext";
import { updateScore } from "../utils/updateScore";
import LoadingOverlay from "../components/LoadingScreen";
import GameResultOverlay from "../components/GameResultOverlay";

export default function GamePage() {
  const { player, updatePlayerScore } = usePlayer();
  const navigate = useNavigate();
  const mapId = player?.cityMapId;
  const [factQuestions, setFactQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [checkpointNode, setCheckpointNode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalDistanceMoved, setTotalDistanceMoved] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const[isFinished, setIsFinished] = useState(false);

  // Fetch fact questions.
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => setFactQuestions(data))
      .catch((error) => console.error("Error fetching fact questions:", error));
  }, [mapId]);

  // When factQuestions are available, load the first question and its checkpoint node.
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      if (isFirstLoad) {
        setIsLoading(true);
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${firstQuestion.nodeId}`)
          .then((res) => res.json())
          .then((data) => setCheckpointNode(data))
          .catch((error) =>
            console.error("Error fetching checkpoint node:", error)
          );
        setTimeout(() => {
          setIsLoading(false);
          setIsFirstLoad(false);
        }, 3000);
      } else {
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${firstQuestion.nodeId}`)
          .then((res) => res.json())
          .then((data) => setCheckpointNode(data))
          .catch((error) =>
            console.error("Error fetching checkpoint node:", error)
          );
      }
    }
  }, [factQuestions, mapId, isFirstLoad]);

  const handleCheckpointReached = () => {
    setShowModal(true);
  };

  const onMove = (distance) => {
    setTotalDistanceMoved(totalDistanceMoved + distance);
    console.log("Total distance moved:", totalDistanceMoved+distance);
  };

  const handleAnswerSubmit = async (userAnswer) => {
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase()
    ) {
      alert(
        `Correct! You've earned ${currentQuestion.score} points. Points added to user ${player.name}`
      );
      const newScore = currentScore + currentQuestion.score;
      setCurrentScore(newScore);
      const currentIndex = factQuestions.indexOf(currentQuestion);
      const nextQuestionIndex = currentIndex + 1;
      if (nextQuestionIndex < factQuestions.length) {
        const nextQuestion = factQuestions[nextQuestionIndex];
        setCurrentQuestion(nextQuestion);
        // For subsequent questions, do not show the overlay.
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${nextQuestion.nodeId}`)
          .then((res) => res.json())
          .then((data) => setCheckpointNode(data))
          .catch((error) =>
            console.error("Error fetching checkpoint node:", error)
          );
      } else {
        await updateScore(player, newScore);
        updatePlayerScore(newScore);
        //navigate("/Result");
        setIsFinished(true)
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
    setShowModal(false);
  };

  return (
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
      {currentQuestion && (
        <InteractiveMap
          mapId={mapId}
          checkpointNode={checkpointNode}
          onCheckpointReached={handleCheckpointReached}
          onMove={onMove}
        />
      )}
      {showModal && currentQuestion && (
        <QuestionModal
          task={currentQuestion}
          onSubmit={handleAnswerSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    
      {isLoading && <LoadingOverlay loadingText="Initierer kart..."/>}
      {isFinished && <GameResultOverlay currentPlayer = {player}/>}
    </div>
  );
}