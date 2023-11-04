// Wait for the DOM to be fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
  // Get the elements from the DOM
  const userInputField = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const chatMessagesContainer = document.getElementById('chat-messages');

  // Function to update the chat with a new message
  function updateChat(userOrBot, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(userOrBot); // Apply CSS class for styling
    messageDiv.textContent = `${userOrBot === 'user' ? 'You' : 'Bot'}: ${text}`;
    chatMessagesContainer.appendChild(messageDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to the bottom
  }

  // Event handler for the Send button
  sendButton.addEventListener('click', function() {
    const userInput = userInputField.value.trim();
    if (userInput) {
      // Update the chat with the user's message
      updateChat('user', userInput);

      // Prepare the data to send in the POST request
      const postData = {
        userInput: userInput,
        // Include other data as needed, like chatHistory
      };

      // Send the user input to the server using the Fetch API
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Update the chat with the bot's response
        updateChat('bot', data.message);
      })
      .catch(error => {
        console.error('Error during fetch operation:', error);
        updateChat('bot', 'Sorry, I am unable to respond at the moment.');
      });

      // Clear the input field
      userInputField.value = '';
    }
  });

  // Optionally, trigger the send action when the user presses the Enter key
  userInputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
});
