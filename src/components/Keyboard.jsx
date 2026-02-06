import React from "react";

import { KEYBOARD_KEYS } from "../constants/gameConstants";

import { KeyboardContainer, KeyButton } from "./GameTiles.styles";

const Keyboard = ({ onKeyClick, hardMode }) => {
  return (
    <KeyboardContainer>
      {KEYBOARD_KEYS.map((letter, i) => (
        <KeyButton
          id={letter}
          key={i}
          onClick={() => onKeyClick(letter)}
          $hardMode={hardMode}
        >
          {letter}
        </KeyButton>
      ))}
    </KeyboardContainer>
  );
};

export default Keyboard;
