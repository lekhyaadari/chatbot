//use npm to install openai and readline-sync packages
//Import the OpenAI and readline-sync libraries
const OpenAI = require('openai');
const readline = require('readline-sync');
const openai = new OpenAI({ apiKey:'sk-rW83yvxDYg5XLGTH5oXNT3BlbkFJ0SQGKwpWnShVfuvG6vjxja' }); //replace 'API Key' with your API key

let chatHistory = [];
//Define an async function named main
async function main() {
  let message = "Hello I am Holly, I can recommend you a holiday movie! (enter \'exit chat\' at anytime to stop chat)";
  console.log(chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].content : message);
  while (true) {
    let userInput = readline.question('');
    chatHistory.push({role: "user", content: userInput});

    if (userInput.toLowerCase() === 'exit chat') {
      console.log('Goodbye!');
      break;
    }

    const completion = await openai.chat.completions.create({
      messages: chatHistory,
      model: "gpt-3.5-turbo",
    });
    let response = completion.choices[0].message.content;
    console.log(response);

    chatHistory.push({role: "system", content: response});

    message = chatHistory[chatHistory.length - 1].content;
  }
}

//call the main() function
main();