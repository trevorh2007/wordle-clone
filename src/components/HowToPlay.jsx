import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
`;

const HowToPlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.5s ease-out
    forwards;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 28px;
  font-weight: 400;
  color: #888;
  transition: color 0.5s ease;

  &:hover {
    cursor: pointer;
    color: #fff;
  }
`;

const Card = styled.div`
  padding: 16px 32px 32px;
  width: 100%;
  max-width: 500px;
  background: #121213;
  border: 1px solid #3a3a3c;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.3s ease-out
    forwards;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 16px 20px 24px;
    max-width: 80%;
  }

  ul {
    margin: 0 0 4px 0;
    padding-left: 25px;
    li {
      margin-bottom: 8px;
      font-size: 14px;
      color: #d7dadc;
    }
  }
`;

const Title = styled.h2`
  margin: 25px 0 16px 0;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 1.4;
  color: #d7dadc;
  text-align: left;
`;

const SectionTitle = styled.h3`
  margin: 24px 0 12px 0;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  width: 100%;
`;

const ExampleRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

const ExampleTile = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  background: ${(props) => props.$color || "#818384"};

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

const ExampleDescription = styled.p`
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.4;
  color: #d7dadc;
  text-align: left;
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const HowToPlay = ({ show, setShow }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [show]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      setShow(false);
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <HowToPlayContainer onClick={handleClose} $isClosing={isClosing}>
      <Card onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <CloseButton onClick={handleClose}>✕</CloseButton>
        <Title>How To Play</Title>
        <Description>Guess the Wordle in 6 tries.</Description>

        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>

        <SectionTitle>Examples</SectionTitle>

        <ExampleRow>
          <ExampleTile $color="#538d4e">H</ExampleTile>
          <ExampleTile>E</ExampleTile>
          <ExampleTile>L</ExampleTile>
          <ExampleTile>L</ExampleTile>
          <ExampleTile>O</ExampleTile>
        </ExampleRow>
        <ExampleDescription>
          <Strong>H</Strong> is in the word and in the correct spot.
        </ExampleDescription>

        <ExampleRow>
          <ExampleTile>W</ExampleTile>
          <ExampleTile $color="#b59f3b">O</ExampleTile>
          <ExampleTile>R</ExampleTile>
          <ExampleTile>L</ExampleTile>
          <ExampleTile>D</ExampleTile>
        </ExampleRow>
        <ExampleDescription>
          <Strong>O</Strong> is in the word but in the wrong spot.
        </ExampleDescription>

        <ExampleRow>
          <ExampleTile>G</ExampleTile>
          <ExampleTile>A</ExampleTile>
          <ExampleTile>M</ExampleTile>
          <ExampleTile $color="#3a3a3c">E</ExampleTile>
          <ExampleTile>R</ExampleTile>
        </ExampleRow>
        <ExampleDescription>
          <Strong>E</Strong> is not in the word in any spot.
        </ExampleDescription>
      </Card>
    </HowToPlayContainer>
  );
};

export default HowToPlay;
