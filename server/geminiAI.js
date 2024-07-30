import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const generatePostCaptionsByAI = async (
  socialNetwork,
  subject,
  tone
) => {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `Generate 5 captions for a post on ${socialNetwork} social network about the subject of ${subject}, in a ${tone} tone.`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }
    const response = result.response;
    return JSON.parse(response.candidates[0].content.parts[0].text);
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export const getPostIdeasByAI = async (topic) => {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `Generate 10 ideas from the topic of ${topic}`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }
    const response = result.response;
    return JSON.parse(response.candidates[0].content.parts[0].text);
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export const generateCaptionsFromIdeasByAI = async (idea) => {
  const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `Generate 5 captions for the idea of ${idea} for post creation on social networks`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }
    const response = result.response;
    return JSON.parse(response.candidates[0].content.parts[0].text);
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
