const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const currentDateElement = document.getElementById("current-date");

// Function to update the current date
function updateCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Update the current date when the page loads
updateCurrentDate();

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    
    const messageContentDiv = document.createElement("div");
    messageContentDiv.className = "message-content";
    messageContentDiv.textContent = message;
    messageDiv.appendChild(messageContentDiv);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const timestampDiv = document.createElement("div");
    timestampDiv.className = "timestamp";
    const now = new Date();
    timestampDiv.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    chatMessages.appendChild(timestampDiv);
}

function showLoadingIndicator() {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    loadingDiv.textContent = "Bot is typing...";
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const userMessage = userInput.value;
        appendMessage("sent", userMessage);
        userInput.value = "";

        // Show a loading indicator while the bot is processing the response
        showLoadingIndicator();

        // Simulate a delay (you can replace this with your actual bot response logic)
        setTimeout(function() {
            // Remove the loading indicator
            chatMessages.removeChild(chatMessages.lastChild);

            // Replace this with your actual bot response
            const botResponse = generateBotResponse(userMessage);
            appendMessage("received", botResponse);
        }, 1000); // Simulate a 1-second delay for bot response (adjust as needed)
    }
});

// Function to generate a bot response (you can replace this with your actual logic)
function generateBotResponse(userMessage) {
    // You can implement your chatbot's response logic here
    return "Bot's response goes here";
}