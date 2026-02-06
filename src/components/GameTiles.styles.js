import styled from "styled-components";

export const GameTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  &.shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-5px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(5px);
    }
  }

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
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

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 20px;
    margin: 1px;
  }
`;

export const KeyboardContainer = styled.div`
  width: 510px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  justify-content: center;

  @media (max-width: 768px) {
    width: 460px;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (max-width: 480px) {
    width: 360px;
    padding-top: 20px;
  }

  @media (max-width: 380px) {
    width: 310px;
  }
`;

export const KeyButton = styled.div`
  width: 43px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.$hardMode ? "#222" : "#818384")};
  color: ${(props) => (props.$hardMode ? "red" : "#fff")};
  transition: 1s all ease;
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

  @media (max-width: 768px) {
    width: 38px;
    height: 50px;
    margin: 3px;
    font-size: 14px;
    &:nth-child(11) {
      margin-left: 18px;
    }
    &:nth-child(20) {
      width: 60px;
    }
    &:nth-child(28) {
      width: 60px;
    }
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 44px;
    margin: 2.5px;
    font-size: 12px;
    &:nth-child(11) {
      margin-left: 14px;
    }
    &:nth-child(20) {
      width: 50px;
      font-size: 10px;
    }
    &:nth-child(28) {
      width: 50px;
      font-size: 10px;
    }
  }

  @media (max-width: 380px) {
    width: 26px;
    height: 40px;
    margin: 2px;
    font-size: 11px;
    &:nth-child(11) {
      margin-left: 12px;
    }
    &:nth-child(20) {
      width: 44px;
      font-size: 9px;
    }
    &:nth-child(28) {
      width: 44px;
      font-size: 9px;
    }
  }
`;

export const WinMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
  font-weight: 600;
  margin: 25px 0;
  padding: 0 20px;
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

  @media (max-width: 768px) {
    font-size: 36px;
    margin: 15px 0;
    .you-win {
      font-size: 24px;
    }
    .solution-was {
      font-size: 24px;
    }
    .roboto-wordle {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    font-size: 28px;
    .you-win {
      font-size: 20px;
    }
    .solution-was {
      font-size: 20px;
    }
    .roboto-wordle {
      font-size: 18px;
    }
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
  padding: 0 20px;
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

  @media (max-width: 768px) {
    font-size: 36px;
    margin: 15px 0;
    .solution-was-lose {
      font-size: 24px;
    }
    .roboto-wordle-lose {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    font-size: 28px;
    .solution-was-lose {
      font-size: 20px;
    }
    .roboto-wordle-lose {
      font-size: 18px;
    }
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

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

export const NotInDictionary = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const HardModeError = styled.div`
  color: red;
  font-size: 22px;
  font-weight: 600;
  width: 75%;
  text-align: center;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    width: 90%;
    padding-top: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    width: 95%;
    padding-top: 15px;
  }
`;

export const LoadingMessage = styled.div`
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #538d4e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #6aaa64;
  }
`;
