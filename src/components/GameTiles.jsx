import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Definition from "./Definition";

const GameTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const TileRow = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  .flip {
    animation: 0.5s linear flipping;
  }
  @keyframes flipping {
    0% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(90deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
`;
const Tile = styled.div`
  width: 62px;
  height: 62px;
  border: 2px solid #3a3a3c;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  user-select: none;
`;

const KeyboardContainer = styled.div`
  width: 510px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
`;
const KeyButton = styled.div`
  width: 43px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: #818384;
  margin: 4px;
  user-select: none;
  &:nth-child(11) {
    margin-left: 20px;
  }
  &:nth-child(20) {
    width: 68px;
  }
  &:nth-child(28) {
    width: 68px;
  }
  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
const WinMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
  font-weight: 600;
  margin: 25px 0;
  .you-win {
    font-size: 28px;
    color: #538d4e;
    text-align: center;
    margin-bottom: 10px;
  }
  .solution-was {
    font-size: 28px;
  }
  .roboto-wordle {
    font-family: roboto;
    font-size: 24px;
    text-align: center;
    margin-top: 3px;
    color: #538d4e;
  }
`;
const LoseMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
  font-weight: 600;
  margin: 25px 0;
  color: red;
  .solution-was-lose {
    font-size: 28px;
  }
  .roboto-wordle-lose {
    font-family: roboto;
    font-size: 24px;
    text-align: center;
    margin: 10px 0;
    color: red;
  }
`;
const GameOver = styled.button`
  padding: 15px 25px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  background: #538d4e;
  color: #fff;
  &:hover {
    background: #616161;
    cursor: pointer;
  }
`;
const NotInDictionary = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
`;
const HardModeError = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
  width: 75%;
  text-align: center;
  padding-top: 30px;
`;

const GameTiles = ({ hardMode }) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const [winnerWinner, setWinnerWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordle, setWordle] = useState("");
  const [isAValidWord, setIsAValidWord] = useState(true);
  const [definition, setDefinition] = useState("");
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "<<",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "ENTER",
  ];
  const [guessRows, setGuessRows] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [hardModeTiles, setHardModeTiles] = useState([]);
  const [hardModeError, setHardModeError] = useState(false);

  const getWordle = async () => {
    try {
      const response = await axios("http://localhost:8000/word");
      setWordle(response.data.toUpperCase());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (wordle === "") {
      getWordle();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTile, currentRow, gameOver, guessRows, loser]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && currentTile === 5) {
      if (gameOver) {
        resetGame();
        return;
      } else {
        setHardModeError(false);
        checkRow();
        return;
      }
    }
    if (e.keyCode === 8) {
      deleteLetter();
      return;
    }
    if (
      e.keyCode >= 65 &&
      e.keyCode <= 90 &&
      currentTile < 5 &&
      currentRow < 6
    ) {
      addLetter(e.key.toUpperCase());
    }
  };

  const handleClick = (letter) => {
    if (letter === "<<") {
      deleteLetter();
      return;
    }
    if (letter === "ENTER") {
      checkRow();
      return;
    }
    if (currentTile < 5 && currentRow < 6) {
      addLetter(letter);
    }
  };

  const addLetter = (letter) => {
    let newGuessRows = [...guessRows];
    newGuessRows[currentRow][currentTile] = letter;
    setGuessRows(newGuessRows);
    setCurrentTile(currentTile + 1);
  };

  const deleteLetter = () => {
    if (currentTile > 0 && !gameOver) {
      setIsAValidWord(true);
      let deletedLastGuessRows = [...guessRows];
      deletedLastGuessRows[currentRow][currentTile - 1] = "";
      setGuessRows(deletedLastGuessRows);
      setCurrentTile(currentTile - 1);
    }
  };

  const checkRow = async () => {
    const guess = guessRows[currentRow].join("");
    if (currentTile === 5) {
      try {
        const response = await axios(
          `http://localhost:8000/check/?word=${guess}`,
        );
        if (response.data === "Entry word not found") {
          setIsAValidWord(false);
          return;
        } else {
          // checks if guess contains all the yellow/green tiles
          const found = hardModeTiles.every(
            (r) => guessRows[currentRow].indexOf(r) >= 0,
          );

          if (!found && hardModeTiles.length > 0 && hardMode) {
            setHardModeError(true);
          } else {
            await flipTile();
            if (wordle === guess) {
              setWinnerWinner(true);
              setGameOver(true);
              return;
            } else {
              if (currentRow >= 5) {
                setGameOver(true);
                setLoser(true);
                return;
              }
              if (currentRow < 5) {
                setCurrentRow(currentRow + 1);
                setCurrentTile(0);
              }
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addColorToKey = (tileLetter, color) => {
    const key = document.getElementById(tileLetter);
    key.classList.add(color);
  };

  const flipTile = () => {
    return new Promise((resolve) => {
      const rowTiles = document.querySelector(
        "#guessRow-" + currentRow,
      ).childNodes;
      let checkWordle = wordle;
      const guess = [];

      rowTiles.forEach((x, index) => {
        guess.push({
          letter: guessRows[currentRow][index],
          color: "grey-overlay",
        });
      });

      guess.forEach((guess, index) => {
        if (guess.letter === wordle[index]) {
          guess.color = "green-overlay";
          checkWordle = checkWordle.replace(guess.letter, "");
          if (!hardModeTiles.includes(guess.letter)) {
            setHardModeTiles((hardModeTiles) => [
              ...hardModeTiles,
              guess.letter,
            ]);
          }
        } else if (checkWordle.includes(guess.letter)) {
          guess.color = "yellow-overlay";
          checkWordle = checkWordle.replace(guess.letter, "");
          if (!hardModeTiles.includes(guess.letter)) {
            setHardModeTiles((hardModeTiles) => [
              ...hardModeTiles,
              guess.letter,
            ]);
          }
        }
      });

      rowTiles.forEach((tile, index) => {
        setTimeout(() => {
          tile.classList.add("flip");
          tile.classList.add(guess[index].color);
          addColorToKey(guess[index].letter, guess[index].color);
        }, 500 * index);
      });

      setTimeout(() => {
        resolve("done flipping");
      }, 2700);
    });
  };

  const resetGame = () => {
    let grey = document.getElementsByClassName("grey-overlay");
    let yellow = document.getElementsByClassName("yellow-overlay");
    let green = document.getElementsByClassName("green-overlay");
    let flip = document.getElementsByClassName("flip");

    const removeColors = () => {
      if (grey[0]) {
        grey[0].classList.remove("grey-overlay");
        if (grey[0]) removeColors();
      }
      if (yellow[0]) {
        yellow[0].classList.remove("yellow-overlay");
        removeColors();
      }
      if (green[0]) {
        green[0].classList.remove("green-overlay");
        removeColors();
      }
      if (flip[0]) {
        flip[0].classList.remove("flip");
        removeColors();
      }
    };

    if (grey[0] || yellow[0] || green[0] || flip[0]) {
      removeColors();
    }

    setWinnerWinner(false);
    setGameOver(false);
    setCurrentRow(0);
    setCurrentTile(0);
    setGuessRows([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setHardModeTiles([]);
    setLoser(false);
    setDefinition("");
    getWordle();
  };

  const getGameTiles = () => {
    return guessRows.map((tile, i) => {
      return (
        <TileRow id={"guessRow-" + i} key={i}>
          {tile.map((guess, j) => {
            return (
              <Tile id={"guessRow-" + i + "-tile-" + j} key={j}>
                {guess}
              </Tile>
            );
          })}
        </TileRow>
      );
    });
  };

  const getKeyboard = () => {
    return keys.map((letter, i) => {
      return (
        <KeyButton id={letter} key={i} onClick={() => handleClick(letter)}>
          {letter}
        </KeyButton>
      );
    });
  };

  return (
    <>
      <GameTileContainer>{getGameTiles()}</GameTileContainer>
      {hardModeError && (
        <HardModeError>
          Hard mode is on, you must use all the yellow and green letters from
          previous guesses.
        </HardModeError>
      )}
      {winnerWinner && (
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
      )}
      {loser && (
        <LoseMessage>
          <div className="solution-was-lose">Solution Was</div>
          <div className="roboto-wordle-lose">{wordle}</div>
          <Definition
            wordle={wordle}
            definition={definition}
            setDefinition={setDefinition}
          />
        </LoseMessage>
      )}
      {gameOver && <GameOver onClick={() => resetGame()}>New game</GameOver>}
      {!isAValidWord && (
        <NotInDictionary>Word not in dictionary</NotInDictionary>
      )}
      <KeyboardContainer>{getKeyboard()}</KeyboardContainer>
    </>
  );
};

export default GameTiles;
