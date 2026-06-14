require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    // Allow all vercel.app domains and localhost
    if (!origin || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());

app.use('/api', emailRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,                   // 50 requests per window per IP
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

// ── Physio System Prompt ──────────────────────────────────────────────────────
const PHYSIO_SYSTEM_PROMPT = `You are the virtual assistant for Wellness Physio Center, a leading physiotherapy clinic in Mumbai, India. You help patients with queries about the clinic and physiotherapy in general.

ABOUT THE CLINIC:
- Name: Wellness Physio Center
- Location: Mumbai, India
- Website: https://wellnessphysiocenter.com
- Specialties: Personalized physiotherapy, evidence-based care, tailored exercise programs, rehabilitation, and pain management.

YOUR ROLE:
1. Welcome patients warmly and answer questions about Wellness Physio Center's services.
2. Explain physiotherapy treatments for common conditions: back pain, neck pain, knee pain, shoulder injuries, sports injuries, post-surgical rehab, neurological conditions, and more.
3. Help patients understand what to expect during their first visit at the clinic.
4. Provide general guidance on home exercises and post-treatment care.
5. Assist with appointment-related questions (advise them to call the clinic or use the website to book).
6. Answer FAQs about what physiotherapy can treat and how it helps.

IMPORTANT RULES:
- Never diagnose medical conditions or prescribe specific treatments.
- Always remind patients that the physiotherapist will create a personalised treatment plan after assessment.
- If a patient describes severe or emergency symptoms (chest pain, loss of consciousness, severe trauma, stroke symptoms), tell them to call emergency services (112 in India) immediately.
- Keep responses concise, warm, and easy to understand. Avoid medical jargon.
- Do not discuss topics unrelated to physiotherapy or the clinic.
- If asked who you are, introduce yourself as the Wellness Physio Center virtual assistant.
- Respond in English by default; if the patient writes in Hindi or Marathi, respond in the same language.`;

// ── Chat Route ────────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Validate message format
  const sanitized = messages
    .filter((m) => m.role && m.content && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) })) // cap length
    .slice(-20); // keep last 20 messages to avoid token overflow

  if (sanitized.length === 0) {
    return res.status(400).json({ error: "No valid messages provided." });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: PHYSIO_SYSTEM_PROMPT,
      messages: sanitized,
    });

    const reply = response.content[0]?.text || "Sorry, I couldn't generate a response.";
    return res.json({ reply });
  } catch (err) {
    console.error("Anthropic API error:", err.message);
    return res.status(500).json({ error: "Failed to get a response. Please try again." });
  }
});

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// Remove app.listen for Vercel
module.exports = app;