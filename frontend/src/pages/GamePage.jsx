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
  const [totalDistanceMoved, setTotalDistanceMoved] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(true);

  // Overlay state and flag for first load
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Fetch fact questions
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => setFactQuestions(data))
      .catch((error) => console.error("Error fetching fact questions:", error));
  }, [mapId]);

  // When factQuestions are available, load the first question and its checkpoint node. 
  // Overlay "Initierer kartet"
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      if (isFirstLoad) {
        setIsOverlayActive(true);
        fetchNodeToQuestion(mapId, firstQuestion.nodeId)
        setTimeout(() => {
          setIsOverlayActive(false);
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
    setShowModal(true);
    setQuestionAnswered(false);
  };

  const onMove = (distance) => {
    setTotalDistanceMoved(totalDistanceMoved + distance);
    console.log("Total distance moved:", totalDistanceMoved + distance);
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
        fetchNodeToQuestion(mapId, nextQuestion.nodeId)
      } else {
        await updateScore(player, newScore);
        updatePlayerScore(newScore);
        navigate("/Result");
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
    setShowModal(false);
    setQuestionAnswered(true);

  };

  return (
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
      <div className="relative w-[80vh] h-[50%]">
        {currentQuestion && (
          <InteractiveMap
            mapId={mapId}
            checkpointNode={checkpointNode}
            onCheckpointReached={handleCheckpointReached}
            onMove={onMove}
            questionAnswered={questionAnswered}
          />
        )}
        {/* Position modal within the map space even though not a child */}
        {showModal && currentQuestion && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
            <QuestionModal
              task={currentQuestion}
              onSubmit={handleAnswerSubmit}
            />
          </div>
        )}
      </div>
      {/* Always render the overlay; control its opacity with isOverlayActive */}
      <div
        className="fixed inset-0 flex justify-center items-center bg-[#1b325e] bg-opacity-50"
        style={{
          zIndex: 9999,
          transition: "opacity 0.5s ease",
          opacity: isOverlayActive ? 1 : 0,
          pointerEvents: isOverlayActive ? "auto" : "none",
        }}
      >
        <div className="loader text-white text-xl">Initierer kartet...</div>
      </div>
    </div>
  );
}