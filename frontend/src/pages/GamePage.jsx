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
  const [currentScore, setCurrentScore] = useState(0);
  const [totalDistanceMoved, setTotalDistanceMoved] = useState(0);

  const [showChallenge, setShowChallenge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch fact questions
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => setFactQuestions(data))
      .catch((error) => console.error("Error fetching fact questions:", error));
  }, [mapId]);

  // When factQuestions are available, load the first question and its checkpoint node. 
  // Actives loading overlay
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      if (isFirstLoad) {
        setIsLoading(true);
        fetchNodeToQuestion(mapId, firstQuestion.nodeId)
        setTimeout(() => {
          setIsLoading(false);
          setIsFirstLoad(false);
        }, 3000);
      } else {
        fetchNodeToQuestion(mapId, firstQuestion.nodeId)
      }
    }
  }, [factQuestions, mapId, isFirstLoad]);

  const fetchNodeToQuestion = (mapId, nodeId) => {
    fetch(`http://localhost:3000/api/roadnet/${mapId}/${nodeId}`)
      .then((res) => res.json())
      .then((data) => setCheckpointNode(data))
      .catch((error) =>
        console.error("Error fetching node corresponding to fact-question:", error)
      );
  }

  const handleCheckpointReached = () => {
    setShowChallenge(true);
  };

  const onMove = (distance) => {
    setTotalDistanceMoved(totalDistanceMoved + distance);
    console.log("Total distance moved:", totalDistanceMoved + distance);
  };

  const handleAnswerSubmit = async (userAnswer) => {
    let isCorrect = false;
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
      isCorrect = true
      const newScore = currentScore + currentQuestion.score;
      setCurrentScore(newScore);
    }
    const currentIndex = factQuestions.indexOf(currentQuestion);
    const nextQuestionIndex = currentIndex + 1;
    if (nextQuestionIndex < factQuestions.length) {
      const nextQuestion = factQuestions[nextQuestionIndex];
      setCurrentQuestion(nextQuestion);
      fetchNodeToQuestion(mapId, nextQuestion.nodeId)
    } else {
      await updateScore(player, newScore);
      updatePlayerScore(newScore);
      //navigate("/Result");
      setIsFinished(true)
    }
    return isCorrect;
};

return (
  <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {currentQuestion && (
        <InteractiveMap
          mapId={mapId}
          checkpointNode={checkpointNode}
          onCheckpointReached={handleCheckpointReached}
          onMove={onMove}
          showArrows={!showChallenge}
        />
      )}
      {showChallenge && currentQuestion && (
        <QuestionModal
          task={currentQuestion}
          onSubmit={handleAnswerSubmit}
          onClose={() => {
            setShowChallenge(false);
          }}
        />
      )}
    </div>

    {isLoading && <LoadingOverlay loadingText="Initierer kart..." />}
    {isFinished && <GameResultOverlay currentPlayer={player} />}
  </div>
);
}