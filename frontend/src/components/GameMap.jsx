import { useState, useEffect } from "react";
import MapComponent from "./MapComponent";

const GameMap = ({ handleCorrectAnswer }) => {
  const [factQuestions, setFactQuestions] = useState([]);
  const [questionCoordinates, setQuestionCoordinates] = useState([]);
  const [mergedQuestions, setMergedQuestions] = useState([]);

  // Hent fact_questions
  useEffect(() => {
    fetch("http://localhost:3000/api/fact_questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("factQuestions fetched:", data);
        setFactQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching fact questions:", error);
      });
  }, []);

  // Hent question_coordinates
  useEffect(() => {
    fetch("http://localhost:3000/api/question_coordinates")
      .then((res) => res.json())
      .then((data) => {
        console.log("questionCoordinates fetched:", data);
        setQuestionCoordinates(data);
      })
      .catch((error) => {
        console.error("Error fetching question coordinates:", error);
      });
  }, []);

  // Slå sammen factQuestions og questionCoordinates
  useEffect(() => {
    if (factQuestions.length > 0 && questionCoordinates.length > 0) {
      const merged = factQuestions.map((fq) => {
        // Sammenlign fq.locationid med qc.id (begge er tall)
        const coord = questionCoordinates.find(
          (qc) => qc.id === fq.locationid
        );
        return {
          ...fq,
          // Bruk coord.latitude og coord.longitude – sett til 0 om ingen match
          lat: coord ? parseFloat(coord.latitude) : 0,
          lng: coord ? parseFloat(coord.longitude) : 0,
        };
      });
      console.log("Merged questions:", merged);
      setMergedQuestions(merged);
    }
  }, [factQuestions, questionCoordinates]);

  return (
    <MapComponent
      handleCorrectAnswer={handleCorrectAnswer}
      factQuestions={mergedQuestions}
    />
  );
};

export default GameMap;