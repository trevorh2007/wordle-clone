import React from "react";

import { GameTileContainer, TileRow, Tile } from "./GameTiles.styles";

const GameBoard = ({ guessRows }) => {
  return (
    <GameTileContainer>
      {guessRows.map((tile, i) => (
        <TileRow id={"guessRow-" + i} key={i}>
          {tile.map((guess, j) => (
            <Tile id={"guessRow-" + i + "-tile-" + j} key={j}>
              {guess}
            </Tile>
          ))}
        </TileRow>
      ))}
    </GameTileContainer>
  );
};

export default GameBoard;
