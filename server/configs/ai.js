import OpenAI from "openai";

const cleanEnv = (value) =>
  typeof value === "string" ? value.trim().replace(/^["']|["']$/g, "") : value;

const apiKey = cleanEnv(process.env.OPENAI_API_KEY);
const baseURL = cleanEnv(process.env.OPENAI_BASE_URL);

const ai = new OpenAI({
  apiKey,
  ...(baseURL ? { baseURL } : {}),
});

export default ai;
