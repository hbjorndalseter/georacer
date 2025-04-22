import { useState, useEffect } from "react";
import InteractiveMap from "../components/InteractiveMap";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../components/QuestionModal";
import { usePlayer } from "../context/PlayerContext";
import { updateScore } from "../utils/updateScore";
import LoadingOverlay from "../components/LoadingScreen";
import GameResultOverlay from "../components/GameResultOverlay";
import GameHUD from '../components/GameHUD';
import { dijkstraShortestPath, calculateScoreByDistance } from "../utils/algorithms";

export default function GamePage() {
  const { player, updatePlayerScore } = usePlayer();
  const mapId = player?.cityMapId;
  const [mapName, setMapName] = useState();

  const [factQuestions, setFactQuestions] = useState([]); // All questions in order for the map
  const [currentQuestion, setCurrentQuestion] = useState(null); // The question that was previously shown to the user or being shown in the modal
  const [checkpointNode, setCheckpointNode] = useState(null); // Node at where the next checkpoint is

  const [currentScore, setCurrentScore] = useState(0);
  const [totalDistanceMoved, setTotalDistanceMoved] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isHighscore, setIsHighscore] = useState(false);

  const [showChallenge, setShowChallenge] = useState(false);
  const [showArrows, setShowArrows] = useState(true)
  const [isFinished, setIsFinished] = useState(false);
  const [showGameResults, setShowGameResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [shortestPathDistance, setShortestPathDistance] = useState()

  // Fetch fact questions and map name when the page loads
  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => setFactQuestions(data))
      .catch((error) => console.error("Error fetching fact questions:", error));

    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps/${mapId}`)
      .then((res) => res.json())
      .then((data) => setMapName(data))
      .catch((error) => console.error("Error fetching map name:", error));

  }, [mapId]);

  // When factQuestions are available, load the first question's checkpoint node and calculate the totalShortestDistance
  useEffect(() => {

    if (factQuestions.length > 0) {
      calculateShortestPath();
      const firstQuestion = factQuestions[0];
      fetchNodeToQuestion(mapId, firstQuestion.nodeId);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [factQuestions]);

  const calculateShortestPath = async () => {
    let sum = 0
    let nodeId1;
    console.log(factQuestions.length)
    for (let i = -1; i < factQuestions.length - 1; i++) {
      if (i == -1) {
        nodeId1 = 1 // First node always id = 1
      }
      else {
        nodeId1 = factQuestions[i].nodeId
      }
      const nodeId2 = factQuestions[i + 1]?.nodeId
      const distance = await dijkstraShortestPath(mapId, nodeId1, nodeId2);
      console.log("Kjøring: ", i)
      sum += distance
    }
    setShortestPathDistance(sum);
  }

  const fetchNodeToQuestion = (mapId, nodeId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/roadnet/${mapId}/${nodeId}`)
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
      setShowArrows(false)
    } else {
      setShowChallenge(false)
    }
  };

  // When you answer the question
  const handleAnswerSubmit = (isCorrect) => {

    let score = currentScore;

    // If correct - update score
    if (isCorrect) {
      score += currentQuestion.score;
      setCurrentScore(score);
      setCorrectAnswers(correctAnswers + 1);
    }

    // Needs the next checkpoint node, but dont update the question itself yet (happens when you reach the next checkpoint)
    const currentIndex = factQuestions.indexOf(currentQuestion);
    const nextQuestionIndex = currentIndex + 1;

    if (nextQuestionIndex < factQuestions.length) {
      setShowArrows(true)
      const nextQuestion = factQuestions[nextQuestionIndex];
      fetchNodeToQuestion(mapId, nextQuestion.nodeId);
    } else { 
      // The game is finishing here, after last question is answered
      setShowArrows(false);
      setTimeout(() => finishGame(score), 1500);
    }
  };

  const finishGame = async (score) => {
    const scoreByDistance = Math.round(calculateScoreByDistance(totalDistanceMoved, shortestPathDistance));
    console.log(scoreByDistance);
    const  finalScore = score + scoreByDistance

    const isHigh = await updateScore(player, finalScore);
    setCurrentScore(finalScore)
    setIsHighscore(isHigh);
    setShowGameResults(true)
  }

  const onMove = (distance) => {
    setTotalDistanceMoved((prev) => prev + distance);
  };

  return (
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <InteractiveMap
          mapId={mapId}
          checkpointNode={checkpointNode}
          onCheckpointReached={handleCheckpointReached}
          onMove={onMove}
          showArrows={showArrows}
        />

        <GameHUD
          playerName={player?.name}
          totalDistanceMoved={totalDistanceMoved}
          correctAnswers={correctAnswers}
          mapName={mapName}
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
      {showGameResults && <GameResultOverlay
        currentPlayer={player}
        distance={totalDistanceMoved}
        correctAnswers={correctAnswers}
        currentScore={currentScore}
        isHighscore={isHighscore}
      />}
    </div>
  );
}