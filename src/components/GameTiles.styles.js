import styled from "styled-components";

export const GameTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const TileRow = styled.div`
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

export const Tile = styled.div`
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

export const KeyboardContainer = styled.div`
  width: 510px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
`;

export const KeyButton = styled.div`
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

export const WinMessage = styled.div`
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

export const LoseMessage = styled.div`
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

export const GameOver = styled.button`
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

export const NotInDictionary = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
`;

export const HardModeError = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
  width: 75%;
  text-align: center;
  padding-top: 30px;
`;
