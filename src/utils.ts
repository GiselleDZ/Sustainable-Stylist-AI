// Generates a timestamp to use as a key
export const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

// Recieves a string from the stylist conversation, it contains recommendations separated by dashes. It returns an array of recommendations
export const extractRecommendations = (message: string) =>
  message
    .split("--")
    .filter(
      (rec: string, ind: number) =>
        rec.length > 5 && ind !== 0 && rec.includes("size")
    );
