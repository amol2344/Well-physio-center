require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', emailRoutes);

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

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const sanitized = messages
      .filter((m) => m && m.role && m.content && typeof m.content === 'string')
      .slice(-15)
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content.slice(0, 1000),
      }));

    if (sanitized.length === 0) {
      return res.status(400).json({ error: 'No valid messages provided.' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: PHYSIO_SYSTEM_PROMPT },
          ...sanitized,
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Failed to get a response. Please try again.' });
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return res.json({ reply });

  } catch (err) {
    console.error('FULL ERROR:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.get('/', (req, res) => res.json({ message: 'Backend is running' }));

module.exports = app;