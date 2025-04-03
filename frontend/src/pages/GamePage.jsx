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

  const [factQuestions, setFactQuestions] = useState([]); // All questions in order for the map
  const [currentQuestion, setCurrentQuestion] = useState(null); // The question that was previously shown to the user or being shown in the modal
  const [checkpointNode, setCheckpointNode] = useState(null); // Node at where the next checkpoint is

  const [currentScore, setCurrentScore] = useState(0);
  const [totalDistanceMoved, setTotalDistanceMoved] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isHighscore, setIsHighscore] = useState(false);

  const [showChallenge, setShowChallenge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch fact questions when the page loads
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => setFactQuestions(data))
      .catch((error) => console.error("Error fetching fact questions:", error));
  }, [mapId]);

  // When factQuestions are available, load the first question's checkpoint node. 
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      fetchNodeToQuestion(mapId, firstQuestion.nodeId);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [factQuestions]);

  const fetchNodeToQuestion = (mapId, nodeId) => {
    fetch(`http://localhost:3000/api/roadnet/${mapId}/${nodeId}`)
      .then((res) => res.json())
      .then((data) => setCheckpointNode(data))
      .catch((error) =>
        console.error("Error fetching node corresponding to fact-question:", error)
      );
  }

  // When you reach the next checkpoint
  const handleCheckpointReached = () => {
    const currentIndex = factQuestions.indexOf(currentQuestion); // magically returns -1 if currentQuestion = null
    const nextQuestionIndex = currentIndex + 1;

    // Make sure we show the right question (index of previous question + 1)
    if (nextQuestionIndex < factQuestions.length) {
      const nextQuestion = factQuestions[nextQuestionIndex];
      setCurrentQuestion(nextQuestion);
      setShowChallenge(true);
    } else {
      setShowChallenge(false);
    }
  };

  // When you answer the question
  const handleAnswerSubmit = async (userAnswer) => {
    let isCorrect = false;

    // If correct - update score
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
      isCorrect = true;
      const newScore = currentScore + currentQuestion.score;
      setCurrentScore(newScore);
      setCorrectAnswers(correctAnswers + 1);
    }

    // Needs the next checkpoint node, but dont update the question itself yet (happens when you reach the next checkpoint)
    const currentIndex = factQuestions.indexOf(currentQuestion);
    const nextQuestionIndex = currentIndex + 1;

    if (nextQuestionIndex < factQuestions.length) {
      const nextQuestion = factQuestions[nextQuestionIndex];
      fetchNodeToQuestion(mapId, nextQuestion.nodeId);
    } else {
      const highscoreStatus = await updateScore(player, currentScore);
      setIsHighscore(highscoreStatus);
      setIsFinished(true);
    }
    return isCorrect;
  };

  const onMove = (distance) => {
    setTotalDistanceMoved((prev) => prev + distance);
  };

  // Logic for FinishedOverlay:
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRetryClick = () => {
    navigate("/Game")
  };

  const handleHighscoreClick = () => {
    navigate("/Result");
  };

  return (
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <InteractiveMap
          mapId={mapId}
          checkpointNode={checkpointNode}
          onCheckpointReached={handleCheckpointReached}
          onMove={onMove}
          showArrows={!showChallenge}
        />
        {showChallenge && (
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
      {isFinished && <GameResultOverlay
        currentPlayer={player}
        distance={totalDistanceMoved}
        correctAnswers={correctAnswers}
        currentScore={currentScore}
        isHighscore={isHighscore}
        onHomeClick={handleHomeClick}
        onRetryClick={handleRetryClick}
        onHighscoreClick={handleHighscoreClick}
      />}
    </div>
  );
}