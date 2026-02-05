import { useEffect } from "react";
import styled from "styled-components";

import { getDefinitionFetch } from "../api/wordApi";

const DefinitionContainer = styled.div`
  max-width: 500px;
  width: 90%;
  font-size: 16px;
  margin-top: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 90vw;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    max-width: 95vw;
  }
`;
const DefinitionHeader = styled.div`
  text-align: center;
  font-size: 18px;
  padding-bottom: 10px;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const DefinitionParagraph = styled.div`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Definition = ({ wordle, definition, setDefinition }) => {
  useEffect(() => {
    if (wordle && !definition) {
      getWordleDefinition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWordleDefinition = async () => {
    const definition = await getDefinitionFetch(wordle);
    setDefinition(definition);
  };

  return (
    <DefinitionContainer>
      <DefinitionHeader>Definition</DefinitionHeader>
      <DefinitionParagraph>{definition}</DefinitionParagraph>
    </DefinitionContainer>
  );
};

export default Definition;
