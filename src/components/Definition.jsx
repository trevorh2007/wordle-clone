import { useEffect } from "react";
import styled from "styled-components";

import { getDefinitionFetch } from "../api/wordApi";

const DefinitionContainer = styled.div`
  max-width: 1000px;
  width: 90%;
  font-size: 16px;
  margin-top: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: left;

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

const PartOfSpeechHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #b59f3a;
  margin-top: 15px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const DefinitionList = styled.ol`
  margin: 0;

  @media (max-width: 480px) {
    padding-left: 16px;
  }

  ol {
    padding: 0;
    color: white;
  }
`;

const DefinitionItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.4;
  color: white;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

const ParenthesisLabel = styled.span`
  color: #87ceeb;
`;

const NoDefinition = styled.div`
  font-size: 16px;
  color: #aaa;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Definition = ({ wordle, definition, setDefinition }) => {
  useEffect(() => {
    if (wordle && (!definition || definition === "")) {
      getWordleDefinition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWordleDefinition = async () => {
    const definition = await getDefinitionFetch(wordle);
    setDefinition(definition);
  };

  const renderDefinition = (def) => {
    const match = def.match(/^(\([^)]+\))\s*(.*)$/);
    if (match) {
      return (
        <>
          <ParenthesisLabel>{match[1]}</ParenthesisLabel> {match[2]}
        </>
      );
    }
    return def;
  };

  return (
    <>
      {definition && definition !== "" ? (
        <DefinitionContainer>
          <DefinitionHeader>Definition</DefinitionHeader>
          {typeof definition === "object" &&
            Object.entries(definition).map(([partOfSpeech, definitions]) => (
              <div key={partOfSpeech}>
                <PartOfSpeechHeader>{partOfSpeech}</PartOfSpeechHeader>
                <DefinitionList>
                  {definitions.map((def, index) => (
                    <DefinitionItem key={index}>
                      {renderDefinition(def)}
                    </DefinitionItem>
                  ))}
                </DefinitionList>
              </div>
            ))}
        </DefinitionContainer>
      ) : (
        <NoDefinition>Definition not available</NoDefinition>
      )}
    </>
  );
};

export default Definition;
