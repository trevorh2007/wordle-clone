import React, { useState } from "react";
import styled from "styled-components";

import GameTiles from "./components/GameTiles";
import NavBar from "./components/NavBar";

import "./App.css";

const Application = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .grey-overlay {
    background: #3a3a3c !important;
    border: none !important;
  }
  .yellow-overlay {
    background: #b59f3a !important;
    border: none !important;
  }
  .green-overlay {
    background: #538d4e !important;
    border: none !important;
  }
`;
const Header = styled.div`
  font-size: 48px;
  font-weight: 600;
  padding-top: 25px;
  color: ${(props) => (props.$hardMode ? "red" : "#fff")};
  transition: 1s all ease;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
    padding-top: 15px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;
const GameContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    justify-content: flex-start;
  }
`;

function App() {
  const [hardMode, setHardMode] = useState(false);

  return (
    <Application>
      <NavBar hardMode={hardMode} setHardMode={setHardMode} />
      <Header $hardMode={hardMode}>Wordle Clone</Header>
      <GameContainer>
        <GameTiles hardMode={hardMode} />
      </GameContainer>
    </Application>
  );
}

export default App;
