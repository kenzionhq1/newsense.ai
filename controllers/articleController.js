const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateArticle = async (req, res) => {
  const { topic, tone } = req.body;
  const user = req.user;

  if (!topic || !tone) {
    return res.status(400).json({ message: 'Topic and tone are required' });
  }

  const prompt = `Write a detailed article on "${topic}" in a ${tone} tone with subheadings and factual content.`;

  try {
    let article;

    if (user?.tier === 'pro') {
      // 🔐 Use OpenAI for Pro users
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });
      article = response.choices[0].message.content;
    } else {
      // ✅ Use Gemini for free users
      const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      article = result.response.text();
    }

    res.json({ article });
  } catch (err) {
    console.error('AI error:', err);
    res.status(500).json({ message: 'Failed to generate article' });
  }
};
