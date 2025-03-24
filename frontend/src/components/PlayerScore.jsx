import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

const PlayerScore = ({ finalScore }) => {
  const { player, updatePlayerScore } = usePlayer();

  useEffect(() => {
    const updateScoreIfHigher = async () => {
      if (!player || finalScore == null) return;

      if (finalScore > player.score) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players/update-score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: player.name,
              cityMapId: player.cityMapId,
              score: finalScore,
            }),
          });

          if (!res.ok) {
            throw new Error("Score-oppdatering feilet");
          }

          console.log("Score oppdatert!");
        } catch (error) {
          console.error("Feil ved score-oppdatering:", error);
        }
      }
    };

    updateScoreIfHigher();
  }, [finalScore, player]);
  updatePlayerScore(finalScore);

  return null; // Denne trenger ikke vise noe
};

export default PlayerScore;