const OpenAI = require('openai');
const express = require('express');
const path = require('path');
const app = express();
const openai = new OpenAI({
  apiKey: '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' // replace with your actual API key
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
  

app.post('/api/chat', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    let chatHistory = req.body.chatHistory || [];

    chatHistory.push({ role: "system", content: "You are a movie recommender." });
    chatHistory.push({ role: "user", content: userInput });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory
    });
    console.log(completion);

    // Update the chat history with the new completion from OpenAI
    chatHistory.push({ role: "assistant", content: completion.choices[0].message.content });

    res.json({
      chatHistory: chatHistory,
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error while calling OpenAI:', error);
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
