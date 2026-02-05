/* eslint-disable no-undef */
const STATS_KEY = "wordle-clone-stats";

export const getStats = () => {
  try {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats) {
      return JSON.parse(stats);
    }
  } catch (error) {
    console.error("Error reading stats from localStorage:", error);
  }

  return {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    maxStreak: 0,
  };
};

export const saveStats = (stats) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving stats to localStorage:", error);
  }
};

export const updateStatsWin = () => {
  const stats = getStats();
  stats.gamesPlayed += 1;
  stats.gamesWon += 1;
  stats.currentStreak += 1;
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  saveStats(stats);
  return stats;
};

export const updateStatsLoss = () => {
  const stats = getStats();
  stats.gamesPlayed += 1;
  stats.gamesLost += 1;
  stats.currentStreak = 0;
  saveStats(stats);
  return stats;
};

export const resetStats = () => {
  const emptyStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    maxStreak: 0,
  };
  saveStats(emptyStats);
  return emptyStats;
};
