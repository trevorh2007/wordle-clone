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
 * Fetches a random 5-letter word for the game along with its definition
 * @returns {Promise<{word: string, definition: Object}>} Word and definition object
 */
export const getWordFetch = async (retryCount = 0, maxRetries = 3) => {
  try {
    // Using Random Word API with 8 second timeout
    const response = await fetchWithTimeout(
      "https://random-word-api.herokuapp.com/word?length=5&number=1",
      8000,
    );
    const data = await response.json();

    if (data && data[0]) {
      // Fetch definition first (also validates the word)
      const definition = await getDefinitionFetch(data[0]);

      if (!definition) {
        if (retryCount < maxRetries) {
          console.log(
            `Invalid word "${data[0]}". Retrying... (${retryCount + 1}/${maxRetries})`,
          );
          return await getWordFetch(retryCount + 1, maxRetries);
        } else {
          console.log("Max retries reached. Falling back to random word.");
          const fallbackWord = getRandomFallbackWord();
          const fallbackDefinition = await getDefinitionFetch(fallbackWord);
          return { word: fallbackWord, definition: fallbackDefinition };
        }
      }

      return { word: data[0].toUpperCase(), definition };
    } else {
      const fallbackWord = getRandomFallbackWord();
      const fallbackDefinition = await getDefinitionFetch(fallbackWord);
      return { word: fallbackWord, definition: fallbackDefinition };
    }
  } catch (error) {
    console.error("Error fetching word:", error?.message);
    const fallbackWord = getRandomFallbackWord();
    const fallbackDefinition = await getDefinitionFetch(fallbackWord);
    return { word: fallbackWord, definition: fallbackDefinition };
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
 * @returns {Promise<Object>} Object with definitions grouped by part of speech
 */
export const getDefinitionFetch = async (word) => {
  try {
    const response = await fetch(getDictionaryApiUrl(word));
    const data = await response.json();

    // Group definitions by part of speech
    const definitionsByPartOfSpeech = {};

    if (data?.entries && data.entries.length > 0) {
      data.entries.forEach((entry) => {
        const partOfSpeech = entry.partOfSpeech;

        if (!definitionsByPartOfSpeech[partOfSpeech]) {
          definitionsByPartOfSpeech[partOfSpeech] = [];
        }

        if (entry.senses && entry.senses.length > 0) {
          entry.senses.forEach((sense) => {
            if (sense.definition) {
              definitionsByPartOfSpeech[partOfSpeech].push(sense.definition);
            }
          });
        }
      });
    }

    return Object.keys(definitionsByPartOfSpeech).length > 0
      ? definitionsByPartOfSpeech
      : null;
  } catch (error) {
    console.error("Error fetching definition:", error);
    return null;
  }
};
