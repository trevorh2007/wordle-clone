import React from "react";
import styled from "styled-components";

import { getStats, resetStats } from "../utils/statsStorage";

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  font-size: 18px;

  @media (max-width: 768px) {
    gap: 10px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    font-size: 14px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #538d4e;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #aaa;
  text-align: center;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ResetButton = styled.button`
  padding: 4px 8px;
  border-radius: 3px;
  border: none;
  font-size: 10px;
  background: #818384;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #616161;
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 9px;
  }
`;

const Stats = () => {
  const [stats, setStats] = React.useState(getStats());

  const handleReset = () => {
    if (window.confirm("Reset all statistics?")) {
      resetStats();
      setStats(getStats());
    }
  };

  // Refresh stats when component mounts or becomes visible
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const winPercentage =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  return (
    <StatsContainer>
      <StatItem>
        <StatValue>{stats.gamesPlayed}</StatValue>
        <StatLabel>Played</StatLabel>
      </StatItem>
      <StatItem>
        <StatValue>{winPercentage}%</StatValue>
        <StatLabel>Win %</StatLabel>
      </StatItem>
      <StatItem>
        <StatValue>{stats.currentStreak}</StatValue>
        <StatLabel>Streak</StatLabel>
      </StatItem>
      <StatItem>
        <StatValue>{stats.maxStreak}</StatValue>
        <StatLabel>Best</StatLabel>
      </StatItem>
      {stats.gamesPlayed > 0 && (
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      )}
    </StatsContainer>
  );
};

export default Stats;
