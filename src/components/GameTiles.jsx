import React, { useEffect, useState } from "react";

import { getWordFetch, getIsWordFetch } from "../api/wordApi";
import {
  WORD_LENGTH,
  MAX_GUESSES,
  EMPTY_BOARD,
} from "../constants/gameConstants";
import { updateStatsWin, updateStatsLoss } from "../utils/statsStorage";

import GameBoard from "./GameBoard";
import {
  WinnerMessage,
  LoserMessage,
  NewGameButton,
  InvalidWordMessage,
  HardModeErrorMessage,
} from "./GameMessages";
import {
  LoadingMessage,
  ErrorContainer,
  RetryButton,
} from "./GameTiles.styles";
import Keyboard from "./Keyboard";

const GameTiles = ({ hardMode, flipDelay = 500 }) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const [winnerWinner, setWinnerWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordle, setWordle] = useState("");
  const [isAValidWord, setIsAValidWord] = useState(true);
  const [definition, setDefinition] = useState("");
  const [guessRows, setGuessRows] = useState(() =>
    EMPTY_BOARD.map((row) => [...row]),
  );
  const [hardModeTiles, setHardModeTiles] = useState([]);
  const [hardModeError, setHardModeError] = useState(false);
  const [fetchingWord, setFetchingWord] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [shake, setShake] = useState(false);

  const getWordle = async () => {
    try {
      setFetchingWord(true);
      const word = await getWordFetch();
      setWordle(word);
      setFetchingWord(false);
    } catch (err) {
      console.error(err);
      setFetchingWord(false);
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

  const handleKeyClick = (letter) => {
    if (isFlipping) {
      triggerShake();
      return;
    }
    if (letter === "<<") {
      deleteLetter();
      return;
    }
    if (letter === "ENTER") {
      checkRow();
      return;
    }
    if (currentTile < WORD_LENGTH && currentRow < MAX_GUESSES) {
      addLetter(letter);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Track wins
  useEffect(() => {
    if (winnerWinner) {
      updateStatsWin();
    }
  }, [winnerWinner]);

  // Track losses
  useEffect(() => {
    if (loser) {
      updateStatsLoss();
    }
  }, [loser]);

  // Fetch initial wordle on mount
  useEffect(() => {
    getWordle();
  }, []);

  // Set up keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTile, currentRow, gameOver, guessRows, loser, isFlipping]);

  const handleKeyDown = (e) => {
    if (isFlipping) {
      triggerShake();
      return;
    }
    if (e.keyCode === 13 && currentTile === WORD_LENGTH) {
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
      currentTile < WORD_LENGTH &&
      currentRow < MAX_GUESSES
    ) {
      addLetter(e.key.toUpperCase());
    }
  };

  const checkRow = async () => {
    const guess = guessRows[currentRow].join("");
    if (currentTile === WORD_LENGTH) {
      try {
        const isValid = await getIsWordFetch(guess);
        if (!isValid) {
          setIsAValidWord(false);
          return;
        } else {
          // checks if guess contains all the yellow/green tiles
          const found = hardModeTiles.every(
            (r) => guessRows[currentRow].indexOf(r) >= 0,
          );

          if (!found && hardModeTiles.length > 0 && hardMode) {
            setHardModeError(true);
            // Clear the current row when hard mode error occurs
            let clearedGuessRows = [...guessRows];
            clearedGuessRows[currentRow] = ["", "", "", "", ""];
            setGuessRows(clearedGuessRows);
            setCurrentTile(0);
          } else {
            await flipTile();
            if (wordle === guess) {
              setWinnerWinner(true);
              setGameOver(true);
              return;
            } else {
              if (currentRow >= MAX_GUESSES - 1) {
                setGameOver(true);
                setLoser(true);
                return;
              }
              if (currentRow < MAX_GUESSES - 1) {
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
    setIsFlipping(true);
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
        }, flipDelay * index);
      });

      setTimeout(
        () => {
          setIsFlipping(false);
          resolve("done flipping");
        },
        flipDelay * WORD_LENGTH + (flipDelay > 0 ? 200 : 0),
      );
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
    setGuessRows(EMPTY_BOARD.map((row) => [...row]));
    setHardModeTiles([]);
    setLoser(false);
    setDefinition("");
    getWordle();
  };

  return (
    <>
      {fetchingWord ? (
        <LoadingMessage>Fetching a word...</LoadingMessage>
      ) : !wordle || wordle === "" ? (
        <ErrorContainer>
          <LoadingMessage>Failed to fetch word.</LoadingMessage>
          <RetryButton onClick={getWordle}>Try again</RetryButton>
        </ErrorContainer>
      ) : (
        <>
          <GameBoard guessRows={guessRows} shake={shake} />
          {hardModeError && <HardModeErrorMessage />}
          {winnerWinner && (
            <WinnerMessage
              wordle={wordle}
              definition={definition}
              setDefinition={setDefinition}
            />
          )}
          {loser && (
            <LoserMessage
              wordle={wordle}
              definition={definition}
              setDefinition={setDefinition}
            />
          )}
          {gameOver && <NewGameButton onClick={resetGame} />}
          {!isAValidWord && <InvalidWordMessage />}
        </>
      )}
      <Keyboard onKeyClick={handleKeyClick} hardMode={hardMode} />
    </>
  );
};

export default GameTiles;
