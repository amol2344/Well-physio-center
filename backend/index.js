require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', emailRoutes);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    console.log('Received Messages:', messages);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages array is required.',
      });
    }

    const prompt = messages
      .filter(
        (m) =>
          m &&
          m.role &&
          m.content &&
          typeof m.content === 'string'
      )
      .slice(-15)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `${PHYSIO_SYSTEM_PROMPT}\n\nConversation:\n${prompt}`,
    });

    const reply =
      result.text || "Sorry, I couldn't generate a response.";

    return res.json({ reply });

  } catch (err) {
    console.error('FULL ERROR:', err);

    if (err.status === 429) {
      return res.json({
        reply:
          'Our AI assistant is temporarily busy. Please try again in a minute or contact the clinic directly.',
      });
    }

    return res.status(500).json({
      error: err.message || 'Internal Server Error',
    });
  }
});

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

console.log('Gemini Key Exists:', !!process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running',
  });
});

module.exports = app;