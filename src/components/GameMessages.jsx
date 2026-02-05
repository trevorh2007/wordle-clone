import React from "react";

import Definition from "./Definition";
import {
  WinMessage,
  LoseMessage,
  GameOver,
  NotInDictionary,
  HardModeError as StyledHardModeError,
} from "./GameTiles.styles";

export const WinnerMessage = ({ wordle, definition, setDefinition }) => (
  <WinMessage>
    <div className="you-win">You won!</div>
    <div className="solution-was">Solution Was</div>
    <div className="roboto-wordle">{wordle}</div>
    <Definition
      wordle={wordle}
      definition={definition}
      setDefinition={setDefinition}
    />
  </WinMessage>
);

export const LoserMessage = ({ wordle, definition, setDefinition }) => (
  <LoseMessage>
    <div className="solution-was-lose">Solution Was</div>
    <div className="roboto-wordle-lose">{wordle}</div>
    <Definition
      wordle={wordle}
      definition={definition}
      setDefinition={setDefinition}
    />
  </LoseMessage>
);

export const NewGameButton = ({ onClick }) => (
  <GameOver onClick={onClick}>New game</GameOver>
);

export const InvalidWordMessage = () => (
  <NotInDictionary>Word not in dictionary</NotInDictionary>
);

export const HardModeErrorMessage = () => (
  <StyledHardModeError>
    Hard mode is on, you must use all the yellow and green letters from previous
    guesses.
  </StyledHardModeError>
);
