import { useEffect } from "react";
import styled from "styled-components";

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
    const response = await fetch(
      `http://localhost:8000/definition/?word=${wordle}`,
    );
    const data = await response.json();
    let fullDef = "";
    for (const def of Object.values(data)) {
      fullDef += def;
    }
    fullDef = fullDef.replace(
      /\((nou)\)\s|\((adj)\)\s|\((vrb)\)\s|\((adv)\)\s/g,
      "",
    );
    let reallyFullDef = "";
    for (const [index, prettyDef] of fullDef.split("\n").entries()) {
      reallyFullDef +=
        index +
        1 +
        ". " +
        prettyDef.charAt(0).toUpperCase() +
        prettyDef.slice(1) +
        "\n";
    }

    setDefinition(reallyFullDef);
  };

  return (
    <DefinitionContainer>
      <DefinitionHeader>Definition</DefinitionHeader>
      <DefinitionParagraph>{definition}</DefinitionParagraph>
    </DefinitionContainer>
  );
};

export default Definition;
