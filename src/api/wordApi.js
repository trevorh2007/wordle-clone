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
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
    );
    return response.ok;
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
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
    );

    if (!response.ok) {
      return "Definition not available";
    }

    const data = await response.json();
    let fullDef = "";

    // Extract definitions from the response
    if (data && data[0] && data[0].meanings) {
      data[0].meanings.forEach((meaning, index) => {
        const partOfSpeech = meaning.partOfSpeech;
        if (meaning.definitions && meaning.definitions.length > 0) {
          meaning.definitions.forEach((def, defIndex) => {
            if (defIndex === 0) {
              // Only take first definition per part of speech
              fullDef += `${index + 1}. (${partOfSpeech}) ${def.definition}\n`;
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
