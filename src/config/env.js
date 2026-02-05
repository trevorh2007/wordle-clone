// Environment configuration helper
export const getApiKey = () => {
  return import.meta.env.VITE_RAPID_API_KEY || "";
};
