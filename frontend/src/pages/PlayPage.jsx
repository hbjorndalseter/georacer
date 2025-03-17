import { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";

const PlayPage = () => {
  const [score, setScore] = useState(0);

  // Original arrays
  const [factQuestions, setFactQuestions] = useState([]);
  const [questionCoordinates, setQuestionCoordinates] = useState([]);

  // Merged array (includes lat/lng from questionCoordinates)
  const [mergedQuestions, setMergedQuestions] = useState([]);

  // Fetch fact_questions
  useEffect(() => {
    fetch("http://localhost:3000/api/fact-questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("factQuestions fetched:", data);
        setFactQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching fact questions:", error);
      });
  }, []);

  // Fetch question_coordinates
  useEffect(() => {
    fetch("http://localhost:3000/api/questions-coordinates")
      .then((res) => res.json())
      .then((data) => {
        console.log("questionCoordinates fetched:", data);
        setQuestionCoordinates(data);
      })
      .catch((error) => {
        console.error("Error fetching question coordinates:", error);
      });
  }, []);

  

  // Merge factQuestions + questionCoordinates whenever both arrays update
  useEffect(() => {
    console.log("factQuestions:", factQuestions);
    factQuestions.forEach((fq) => {
      console.log("fq.locationid =", fq.locationid, typeof fq.locationid);
    });

    console.log("questionCoordinates:", questionCoordinates);
    questionCoordinates.forEach((qc) => {
      console.log("qc.id =", qc.id, typeof qc.id, "qc.latitude =", qc.latitude, "qc.longitude =", qc.longitude);
    });
    // Only merge if both arrays have data
    if (factQuestions.length > 0 && questionCoordinates.length > 0) {
      const merged = factQuestions.map((fq) => {
        // Find matching coordinate by comparing fq.locationid to coord.id
        const coord = questionCoordinates.find((qc) => qc.id === fq.locationId);

        // Return a new object with lat/lng from the coordinate
        return {
          ...fq,
          lat : (coord ? parseFloat(coord.latitude) : 0),
          lng : (coord ? parseFloat(coord.longitude) : 0),
        };
      });

      console.log("Merged questions:", merged);
      setMergedQuestions(merged);
    }
  }, [factQuestions, questionCoordinates]);

  // Handle correct answer to increment score
  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Score display */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 9999,
          backgroundColor: "gray",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
      >
        Score: {score}
      </div>

      {/* Pass mergedQuestions to MapComponent */}
      <MapComponent
        handleCorrectAnswer={handleCorrectAnswer}
        factQuestions={mergedQuestions}
      />
    </div>
  );
};

export default PlayPage;