// controllers/articleController.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const User = require('../models/User'); // ✅ Import user model here
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateArticle = async (req, res) => {
  try {
    const { topic, tone } = req.body;

    if (!topic || !tone) {
      return res.status(400).json({ message: 'Topic and tone are required' });
    }

    const prompt = `Write a detailed article on "${topic}" in a ${tone} tone with subheadings and factual, well-structured content.`;

    let article = '';

    // For now, set manually: false = Gemini, true = OpenAI
    const isPro = false;

    if (isPro) {
      console.log('➡️ Using OpenAI (GPT-4 Turbo)');
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      article = response.choices[0].message.content;
    } else {
      console.log('➡️ Using Gemini (Free)');
      const model = gemini.getGenerativeModel({ model: 'models/gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      article = response.text();
    }

    // ✅ Update article count if user is authenticated
    if (req.user && req.user._id) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { articleCount: 1 },
      });
    }

    return res.json({ article });
  } catch (err) {
    console.error('🔥 AI Generation Error:', err?.response?.data || err.message || err);
    res.status(500).json({ message: 'AI generation failed.' });
  }
};

module.exports = {
  generateArticle,
};
