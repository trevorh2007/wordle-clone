import { useEffect } from "react";
import styled from "styled-components";

import { getDefinitionFetch } from "../api/wordApi";

const DefinitionContainer = styled.div`
  width: 500px;
  font-size: 16px;
  margin-top: 15px;
  white-space: pre-wrap;
`;
const DefinitionHeader = styled.div`
  text-align: center;
  font-size: 18px;
  padding-bottom: 10px;
  text-decoration: underline;
`;
const DefinitionParagraph = styled.div`
  font-size: 16px;
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
