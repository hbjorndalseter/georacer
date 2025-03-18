import { useState, useEffect } from "react";
import GameMap from "../components/GameMap";
import { usePlayer } from "../context/PlayerContext";

const PlayPage = () => {

  return (
    <div>
      <GameMap/> 
    </div>
  );
};

export default PlayPage;