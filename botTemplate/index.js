//use npm to install express and openai packages

const express = require('express');
const app = express();

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:"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" }) //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    try {
        if (userInput == null) {
          throw new Error("Uh oh, no prompt was provided");
        }
        const response = await openai.chat.completions.create({
            model: "ftjob-cuwM6LWhf3UsoIYbBGnpsIJF",
            messages: [
                { role: "system", content: "Elf is an avid movie watcher that can help you pick entertainment for the holidays." },
                { role: "user", content: userInput }
            ],
        });
        res.json({ message: response.choices[0].message.content });
    } catch (error) {
        console.log(error.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
