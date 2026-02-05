/* eslint-disable no-undef */
import {
  getStats,
  saveStats,
  updateStatsWin,
  updateStatsLoss,
  resetStats,
} from "../statsStorage";

describe("statsStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("getStats", () => {
    it("returns default stats when localStorage is empty", () => {
      const stats = getStats();
      expect(stats).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
      });
    });

    it("returns stored stats when localStorage has data", () => {
      const mockStats = {
        gamesPlayed: 10,
        gamesWon: 7,
        gamesLost: 3,
        currentStreak: 2,
        maxStreak: 5,
      };
      localStorage.setItem("wordle-clone-stats", JSON.stringify(mockStats));

      const stats = getStats();
      expect(stats).toEqual(mockStats);
    });

    it("returns default stats when localStorage.getItem throws error", () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      const getItemSpy = jest
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("localStorage error");
        });

      const stats = getStats();

      expect(stats).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error reading stats from localStorage:",
        expect.any(Error),
      );

      getItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("saveStats", () => {
    it("saves stats to localStorage", () => {
      const stats = {
        gamesPlayed: 5,
        gamesWon: 3,
        gamesLost: 2,
        currentStreak: 1,
        maxStreak: 2,
      };

      saveStats(stats);

      const stored = localStorage.getItem("wordle-clone-stats");
      expect(JSON.parse(stored)).toEqual(stats);
    });

    it("handles localStorage.setItem errors gracefully", () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      const setItemSpy = jest
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("localStorage quota exceeded");
        });

      const stats = {
        gamesPlayed: 1,
        gamesWon: 1,
        gamesLost: 0,
        currentStreak: 1,
        maxStreak: 1,
      };

      expect(() => saveStats(stats)).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error saving stats to localStorage:",
        expect.any(Error),
      );

      setItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe("updateStatsWin", () => {
    it("increments win stats correctly", () => {
      const result = updateStatsWin();

      expect(result).toEqual({
        gamesPlayed: 1,
        gamesWon: 1,
        gamesLost: 0,
        currentStreak: 1,
        maxStreak: 1,
      });
    });

    it("updates maxStreak when currentStreak exceeds it", () => {
      localStorage.setItem(
        "wordle-clone-stats",
        JSON.stringify({
          gamesPlayed: 2,
          gamesWon: 2,
          gamesLost: 0,
          currentStreak: 2,
          maxStreak: 2,
        }),
      );

      const result = updateStatsWin();

      expect(result.currentStreak).toBe(3);
      expect(result.maxStreak).toBe(3);
    });

    it("does not decrease maxStreak", () => {
      localStorage.setItem(
        "wordle-clone-stats",
        JSON.stringify({
          gamesPlayed: 5,
          gamesWon: 3,
          gamesLost: 2,
          currentStreak: 1,
          maxStreak: 5,
        }),
      );

      const result = updateStatsWin();

      expect(result.currentStreak).toBe(2);
      expect(result.maxStreak).toBe(5);
    });
  });

  describe("updateStatsLoss", () => {
    it("increments loss stats and resets streak", () => {
      const result = updateStatsLoss();

      expect(result).toEqual({
        gamesPlayed: 1,
        gamesWon: 0,
        gamesLost: 1,
        currentStreak: 0,
        maxStreak: 0,
      });
    });

    it("resets currentStreak to 0 after a loss", () => {
      localStorage.setItem(
        "wordle-clone-stats",
        JSON.stringify({
          gamesPlayed: 5,
          gamesWon: 5,
          gamesLost: 0,
          currentStreak: 5,
          maxStreak: 5,
        }),
      );

      const result = updateStatsLoss();

      expect(result.currentStreak).toBe(0);
      expect(result.maxStreak).toBe(5); // maxStreak should remain unchanged
      expect(result.gamesLost).toBe(1);
    });
  });

  describe("resetStats", () => {
    it("resets all stats to zero", () => {
      localStorage.setItem(
        "wordle-clone-stats",
        JSON.stringify({
          gamesPlayed: 10,
          gamesWon: 7,
          gamesLost: 3,
          currentStreak: 2,
          maxStreak: 5,
        }),
      );

      const result = resetStats();

      expect(result).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
      });
    });

    it("saves reset stats to localStorage", () => {
      resetStats();

      const stored = localStorage.getItem("wordle-clone-stats");
      expect(JSON.parse(stored)).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
      });
    });

    it("returns the empty stats object", () => {
      const result = resetStats();

      expect(result).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        maxStreak: 0,
      });
    });
  });
});
