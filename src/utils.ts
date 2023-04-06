// Generates a timestamp to use as a key
export const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

// Recieves a string from the stylist conversation, it contains recommendations separated by dashes. It returns an array of recommendations
export const extractRecommendations = (message: string) => {
  const divider = message.includes("--")
    ? "--"
    : message.includes("\n")
    ? "\n"
    : message.includes("***")
    ? "***"
    : "";
  return message
    .split(divider)
    .filter((rec: string, ind: number) => rec.length > 5 && ind !== 0);
};
