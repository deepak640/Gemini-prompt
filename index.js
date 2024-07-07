const express = require("express");
var app = express();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
  console.log("running query ... ");
  const prompt = `
how to make mango juice
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("🚀 ~ run ~ text:", text)
  return text;
}

app.listen(3000, () => {
  console.log("Listening ...");
});

app.get("/", async (req, res) => {
  const paragraph = await run();
  res.send(paragraph)
});
