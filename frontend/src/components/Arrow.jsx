// Arrow component
import React from 'react';
import '../styles/Map.css';
import arrowURL from '../assets/arrowScaledDown.png'

export default function Arrow({ rotation_angle, x_position, y_position, onClick }) {
    return (
        <img
            className="arrowSprite"
            style={{ transform: `translate(${x_position}px, ${-y_position}px) rotate(${rotation_angle}deg)`}}
            onClick={onClick}
            src={arrowURL}
        ></img>
    );
}