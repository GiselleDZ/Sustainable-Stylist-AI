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

type ModeType = {
  name: "Refine" | "Update" | "Build" | "";
  description: string;
};

export const blankMode = <ModeType>{ name: "", description: "" };

export const modes = <ModeType[]>[
  {
    name: "Refine",
    description:
      "Perfect your wardrobe by discovering unique vintage and used clothing pieces tailored to your style. Our AI stylist refines your existing wardrobe by curating sustainable, fashionable additions that enhance your personal look.",
  },
  {
    name: "Update",
    description:
      "Stay ahead of fashion trends while keeping it eco-friendly. Update your wardrobe with our AI stylist's personalized recommendations for sustainable and stylish vintage finds that align with the latest trends.",
  },
  {
    name: "Build",
    description:
      "Create a sustainable and stylish wardrobe from scratch with personalized guidance from our AI stylist. We'll help you build a solid foundation with curated vintage and used clothing pieces that reflect your style preferences and ethical values.",
  },
];
