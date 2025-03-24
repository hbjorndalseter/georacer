import { useState, useEffect } from "react";
import InteractiveMap from "../components/InteractiveMap";
import { useNavigate } from "react-router-dom";
import QuestionModal from "../components/QuestionModal";

export default function GamePage() {
  const navigate = useNavigate();
  const mapId = 1; // Temporary mapId
  const [factQuestions, setFactQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [checkpointNode, setCheckpointNode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMapRendered, setIsMapRendered] = useState(false);

  // Fetch fact questions on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => {
        setFactQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching fact questions:", error);
      });
  }, [mapId]);

  // When factQuestions are available, set the first question and fetch its checkpoint node.
  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      // Reset the map-rendered flag as new data is being fetched.
      setIsMapRendered(false);
      fetch(`http://localhost:3000/api/roadnet/${mapId}/${firstQuestion.nodeId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Next checkpoint node fetched:", data);
          setCheckpointNode(data);
          setIsDataLoaded(true); // Data is loaded, now waiting on the map to render.
        })
        .catch((error) => {
          console.error("Error fetching next checkpoint node:", error);
          setIsDataLoaded(true);
        });
    }
  }, [factQuestions, mapId]);

  // Callback to be passed to InteractiveMap.
  const handleMapRendered = () => {
    setIsMapRendered(true);
  };

  // Handle the checkpoint reached event.
  const handleCheckpointReached = () => {
    setShowModal(true);
  };

  // Handle answer submission.
  const handleAnswerSubmit = (userAnswer) => {
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase()
    ) {
      alert(`Correct! You've earned ${currentQuestion.points} points.`);
      const currentIndex = factQuestions.indexOf(currentQuestion);
      const nextQuestionIndex = currentIndex + 1;
      if (nextQuestionIndex < factQuestions.length) {
        const nextQuestion = factQuestions[nextQuestionIndex];
        setCurrentQuestion(nextQuestion);
        // Reset both flags when moving to a new question.
        setIsDataLoaded(false);
        setIsMapRendered(false);
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${nextQuestion.nodeId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Next checkpoint node fetched:", data);
            setCheckpointNode(data);
            setIsDataLoaded(true);
          })
          .catch((error) => {
            console.error("Error fetching next checkpoint node:", error);
            setIsDataLoaded(true);
          });
      } else {
        navigate("/"); // Navigate to the results page if no more questions.
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
    setShowModal(false);
  };

  return (
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-around items-center">
      <h1>GamePage</h1>
      {currentQuestion && (
        <InteractiveMap
          mapId={mapId}
          checkpointNode={checkpointNode}
          onCheckpointReached={handleCheckpointReached}
          onMapRendered={handleMapRendered} // Trigger when the map is fully rendered
        />
      )}
      {showModal && currentQuestion && (
        <QuestionModal
          task={currentQuestion}
          onSubmit={handleAnswerSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
      {(!isDataLoaded || !isMapRendered) && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="loader text-white text-xl">Loading...</div>
        </div>
      )}
    </div>
  );
}