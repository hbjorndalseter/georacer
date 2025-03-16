// Arrow component
import React from 'react';
import '../styles/Map.css';

export default function Arrow({ angle, onClick }) {
    return (
        <img
            className="arrowSprite"
            style={{ transform: `rotate(${angle -90 }deg)` }}
            onClick={onClick}
            alt="Arrow icon"
            src="../../arrow.png"
        ></img>
    );
}