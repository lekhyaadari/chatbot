const readlineSync = require('readline-sync');
const movieData = require('./movieData.json');

const chatHistory = [];

function getUserInput() {
  const userMessage = readlineSync.question('You: ');

  // Store user's input in the chat history
  chatHistory.push({ role: 'user', message: userMessage });

  return userMessage;
}

function respondToUser(input) {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('recommend') && lowerInput.includes('movie')) {
    // Ask the user for their preferred holiday
    console.log("Bot: Sure! What's your preferred holiday (e.g., Christmas or Halloween)?");
    chatHistory.push({ role: 'bot', message: "Bot: Sure! What's your preferred holiday?" });
  } else if (lowerInput.includes('christmas')) {
    // Recommend Christmas movies
    const christmasMovies = movieData.movies.filter(movie => movie.holiday === 'Christmas');
    if (christmasMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * christmasMovies.length);
      const recommendedMovie = christmasMovies[randomIndex];
      console.log(`Bot: I recommend "${recommendedMovie.title}": ${recommendedMovie.description}`);
      chatHistory.push({ role: 'bot', message: `Bot: I recommend "${recommendedMovie.title}": ${recommendedMovie.description}` });
    } else {
      console.log("Bot: Sorry, I don't have any Christmas movie recommendations.");
      chatHistory.push({ role: 'bot', message: "Bot: Sorry, I don't have any Christmas movie recommendations." });
    }
  } else if (lowerInput.includes('halloween')) {
    // Recommend Halloween movies
    const halloweenMovies = movieData.movies.filter(movie => movie.holiday === 'Halloween');
    if (halloweenMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * halloweenMovies.length);
      const recommendedMovie = halloweenMovies[randomIndex];
      console.log(`Bot: I recommend "${recommendedMovie.title}": ${recommendedMovie.description}`);
      chatHistory.push({ role: 'bot', message: `Bot: I recommend "${recommendedMovie.title}": ${recommendedMovie.description}` });
    } else {
      console.log("Bot: Sorry, I don't have any Halloween movie recommendations.");
      chatHistory.push({ role: 'bot', message: "Bot: Sorry, I don't have any Halloween movie recommendations." });
    }
  } else {
    console.log("Bot: I'm not sure what you're asking. Please specify your request.");
    chatHistory.push({ role: 'bot', message: "Bot: I'm not sure what you're asking. Please specify your request." });
  }
}

function chatLoop() {
  console.log('Bot: Hello! I can recommend holiday movies. Type "recommend movie" to get started.');

  while (true) {
    const userMessage = getUserInput();
    respondToUser(userMessage);

    const repeat = readlineSync.keyInYNStrict('Do you want to continue chatting?');
    if (!repeat) {
      break;
    }
  }

  console.log('Bot: Goodbye! Have a great time watching movies!');
}

chatLoop();
