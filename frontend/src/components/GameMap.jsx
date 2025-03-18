import { useState, useEffect } from "react";
import Map from "./MovingCar";

const GameMap = ({}) => {
  const [factQuestions, setFactQuestions] = useState([]);
  const [questionCoordinates, setQuestionCoordinates] = useState([]);
  const [mergedQuestions, setMergedQuestions] = useState([]);

  //Tester kun for gamemap 1
  let mapId = 1;

  // Hent fact_questions
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


  // Slå sammen factQuestions og questionCoordinates
  useEffect(() => {
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

  return (
    <Map mapId={mapId}/>
  );
};

export default GameMap;