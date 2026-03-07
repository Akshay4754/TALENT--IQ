import Groq from "groq-sdk";
import { ENV } from "./env.js";

let _groq;

export function getGroq() {
  if (!_groq) {
    if (!ENV.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set");
    _groq = new Groq({ apiKey: ENV.GROQ_API_KEY });
  }
  return _groq;
}
