const { GoogleGenAI } = require("@google/genai");
require("dotenv").config({
  path: "./.env"
});
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function test() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello"
  });

  console.log(response.text);
}

test();