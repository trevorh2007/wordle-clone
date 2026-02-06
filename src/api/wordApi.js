import fallbackWords from "../constants/fallbackWords.json";

/**
 * Gets a random word from the fallback list
 * @returns {string} A random 5-letter word in uppercase
 */
const getRandomFallbackWord = () => {
  return fallbackWords[
    Math.floor(Math.random() * fallbackWords.length)
  ].toUpperCase();
};

/**
 * Builds the Free Dictionary API URL
 * @param {string} word - The word to look up
 * @returns {string} The API URL
 */
const getDictionaryApiUrl = (word) => {
  return `https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`;
};

/**
 * Creates a timeout promise that rejects after specified milliseconds
 * @param {string} url - The URL to fetch
 * @param {number} timeoutMs - Milliseconds to wait before timing out
 * @returns {Promise} A promise that rejects after timeout
 */
const fetchWithTimeout = (url, timeoutMs = 8000) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeoutMs),
    ),
  ]);
};

/**
 * Fetches a random 5-letter word for the game
 * @returns {Promise<string>} A random 5-letter word in uppercase
 */
export const getWordFetch = async () => {
  try {
    // Using Random Word API with 8 second timeout
    const response = await fetchWithTimeout(
      "https://random-word-api.herokuapp.com/word?length=5&number=1",
      8000,
    );
    const data = await response.json();

    if (data && data[0]) {
      // Check if word is valid in our dictionary api
      const wordInDictionary = await getIsWordFetch(data[0]);

      if (!wordInDictionary) {
        return getRandomFallbackWord();
      }

      return data[0].toUpperCase();
    } else {
      return getRandomFallbackWord();
    }
  } catch (error) {
    console.error("Error fetching word:", error?.message);
    return getRandomFallbackWord();
  }
};

/**
 * Checks if a word is valid in the dictionary
 * @param {string} word - The word to check
 * @returns {Promise<boolean>} True if word exists, false otherwise
 */
export const getIsWordFetch = async (word) => {
  try {
    const response = await fetch(getDictionaryApiUrl(word));
    const data = await response.json();
    return !!(data.entries && data.entries.length > 0);
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
    const response = await fetch(getDictionaryApiUrl(word));
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
