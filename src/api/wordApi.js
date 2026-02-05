// Word API functions - centralized location for all API calls
// Change these endpoints to switch to different APIs

/**
 * Fetches a random 5-letter word for the game
 * @returns {Promise<string>} A random 5-letter word in uppercase
 */
export const getWordFetch = async () => {
  try {
    // Using Random Word API
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5&number=1",
    );
    const data = await response.json();
    return data[0].toUpperCase();
  } catch (error) {
    console.error("Error fetching word:", error);
    // Fallback word list
    const fallbackWords = [
      "REACT",
      "TABLE",
      "PHONE",
      "HOUSE",
      "PLANT",
      "CHAIR",
      "WATER",
      "BREAD",
      "LIGHT",
      "CLOCK",
    ];
    return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
  }
};

/**
 * Checks if a word is valid in the dictionary
 * @param {string} word - The word to check
 * @returns {Promise<boolean>} True if word exists, false otherwise
 */
export const getIsWordFetch = async (word) => {
  try {
    // Using Free Dictionary API
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`,
    );
    const data = await response.json();
    if (data.entries && data.entries.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating word:", error);
    return false;
  }
};

/**
 * Fetches the definition of a word
 * @param {string} word - The word to get definition for
 * @returns {Promise<string>} Formatted definition string
 */
export const getDefinitionFetch = async (word) => {
  try {
    // Using Free Dictionary API
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`,
    );

    const data = await response.json();
    let fullDef = "";
    let defNumber = 1;

    // Extract definitions from the response
    if (data?.entries && data.entries.length > 0) {
      data.entries.forEach((entry) => {
        const partOfSpeech = entry.partOfSpeech;
        if (entry.senses && entry.senses.length > 0) {
          entry.senses.forEach((sense) => {
            if (sense.definition) {
              fullDef += `${defNumber}. (${partOfSpeech}) ${sense.definition}\n`;
              defNumber++;
            }
          });
        }
      });
    }

    return fullDef || "Definition not available";
  } catch (error) {
    console.error("Error fetching definition:", error);
    return "Definition not available";
  }
};
