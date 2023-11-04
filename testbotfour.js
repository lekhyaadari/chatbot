//use npm to install openai and readline-sync packages
//Import the OpenAI and readline-sync libraries
const OpenAI = require('openai');
const express = require('express');
const app = express();
//const readline = require('readline-sync');
const openai = new OpenAI({ apiKey:'sk-rW83yvxDYg5XLGTH5oXNT3BlbkFJ0SQGKwpWnShVfuvG6vjxja' }); //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static('lekhyaadari'));

let chatHistory = [];

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a movie recommender" },
            { role: "user", content: userInput }
        ],
    });

    res.json({ message: completion.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
    let message = "Hello I am Holly, I can recommend you a holiday movie! (enter \'exit chat\' at anytime to stop chat)";
    console.log(chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].content : message);
    while (true) {
        
    }
})
  