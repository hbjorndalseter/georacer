import { useState, useEffect } from "react";
import InteractiveMap from "../components/InteractiveMap";

export default function GamePage() {

  const mapId = 1;
  const [factQuestions, setFactQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [nextCheckpointNode, setNextCheckpointNode] = useState(null);

  // Get fact_questions
  useEffect(() => {
    fetch(`http://localhost:3000/api/fact-questions/${mapId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("factQuestions fetched:", data);
        setFactQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching fact questions:", error);
      });
  }, []);

  useEffect(() => {
    if (factQuestions.length > 0) {
      const firstQuestion = factQuestions[0];
      setCurrentQuestion(firstQuestion);
      fetch(`http://localhost:3000/api/roadnet/${mapId}/${firstQuestion.nodeId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Next checkpoint node fetched:", data);
          setNextCheckpointNode(data);
        })
        .catch((error) => {
          console.error("Error fetching next checkpoint node:", error);
        });
    }
  }, [factQuestions]);
  

  const handleCheckpointReached = () => {
    const nextQuestionIndex = factQuestions.indexOf(currentQuestion) + 1;
    if (nextQuestionIndex < factQuestions.length) {
      const nextQuestion = factQuestions[nextQuestionIndex];
      setCurrentQuestion(nextQuestion);
      fetch(`http://localhost:3000/api/roadnet/${mapId}/${nextQuestion.nodeId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Next checkpoint node fetched:", data);
          setNextCheckpointNode(data);
        })
        .catch((error) => {
          console.error("Error fetching next checkpoint node:", error);
        });
    } else {
      console.log("Game over");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1b325e] justify-around items-center flex flex-col">
      <h1>GamePage</h1>
      {currentQuestion && <InteractiveMap mapId={mapId} nextCheckpointNode={nextCheckpointNode} nextCheckpointTask={currentQuestion} onCheckpointReached={handleCheckpointReached} />}
    </div>
  );
};