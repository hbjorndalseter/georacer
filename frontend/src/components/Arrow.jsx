// Arrow component
import React from 'react';
import '../styles/Map.css';
import arrowURL from '../assets/arrowScaledDown.png'

export default function Arrow({ rotation_angle, x_position, y_position, onClick }) {
    return (
      <div
        className="arrowWrapper"
        style={{
          transform: `translate(${x_position}px, ${-y_position}px) rotate(${rotation_angle}deg)`,
          transformOrigin: 'top left',
        }}
      >
        <img
          src={arrowURL}
          className="arrowSprite arrow-grow"
          onClick={onClick}
        />
      </div>
    );
  }