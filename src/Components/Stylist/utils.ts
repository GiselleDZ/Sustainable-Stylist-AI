export const generateOpenAIMessageObj = (role: string, content: string) => ({
  role,
  content,
});

export const greeting = generateOpenAIMessageObj(
  "assistant",
  "Hello, how are you doing today?"
);

export const firstStylistPrompt = generateOpenAIMessageObj(
  "assistant",
  "May I assist you today?"
);

export const secondStylistPrompt = generateOpenAIMessageObj(
  "assistant",
  "I can help you with anything from finding new items to complement your style and wardrobe to finding a style that suits your personality and lifestyle."
);
