export async function updateScore(player, finalScore) {
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
  
        const result = await res.json(); // nytt
        console.log("Oppdateringsrespons:", result);
  
        if (!res.ok) {
          throw new Error("Score-oppdatering feilet");
        }
  
        console.log("Score oppdatert!");
      } catch (error) {
        console.error("Feil ved score-oppdatering:", error);
      }
    }
  }