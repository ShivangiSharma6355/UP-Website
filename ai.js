const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyBP3ym9It_7UkRhf2Ccbt2dKlAKnzB-bf8";
  
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];
  
    let conversationHistory = [];
  
    console.log("Bot: Hi there! I'm a chatbot. How can I help you today?");
  
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    readline.on("line", async (userInput) => {
      // Add user input to the conversation history
      conversationHistory.push({ role: "user", parts: [{ text: userInput }] });
  
      const result = await model.generateContent({
        contents: conversationHistory,
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
  
      // Add bot response to the conversation history
      conversationHistory.push({ role: "model", parts: [{ text: response.text() }] });
  
      console.log("Bot:", response.text());
    });
  }
  
  run();
  