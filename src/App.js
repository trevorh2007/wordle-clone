import './App.css';
import GameTiles from './components/GameTiles.js';
import styled from 'styled-components';

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
`;
const GameContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function App() {
  return (
    <Application>
      <Header>
        Wordle Clone
      </Header>
      <GameContainer>
        <GameTiles />
      </GameContainer>
    </Application>
  );
}

export default App;
