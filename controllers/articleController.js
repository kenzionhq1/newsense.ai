const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateArticle = async (req, res) => {
  const { topic, tone } = req.body;

  if (!topic || !tone) {
    return res.status(400).json({ message: 'Topic and tone are required' });
  }

  try {
    const prompt = `Write a detailed, factual, and structured news article on "${topic}" in a ${tone} tone. Include subheadings, real-world context, and credible style.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const article = response.choices[0].message.content;
    res.status(200).json({ article });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate article' });
  }
};
