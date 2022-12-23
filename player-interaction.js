import * as Phaser from 'phaser';
import { sendMessage, receiveMessage } from './socket';

const playerInteractionContainer = scene.add.container(0, 0);

// Set up a chat log display
const chatLog = scene.add.text(10, 10, '', { font: '16px Arial' });
playerInteractionContainer.add(chatLog);

// Set up an input box to send messages
const inputBox = scene.add.textInput(10, 430, {
  width: 300,
  height: 40,
  padding: 10,
  font: '16px Arial',
  placeHolder: 'Enter a message',
  backgroundColor: '#ffffff',
  type: 'text',
  text: ''
});
playerInteractionContainer.add(inputBox);

// Set up a send button
const sendButton = scene.add.text(320, 430, 'Send', {
  font: '16px Arial',
  color: '#ffffff',
  backgroundColor: '#5e5e5e',
  padding: {
    top: 10,
    bottom: 10,
    left: 20,
    right: 20
  }
});
sendButton.setInteractive();
sendButton.on('pointerdown', () => {
  // Send the message to the other player
  const message = inputBox.getText();
  sendMessage(message);
});
playerInteractionContainer.add(sendButton);

// Set up a listener to receive messages from the other player
receiveMessage((message) => {
  // Display the received message in the chat log
  chatLog.setText(`${chatLog.text}\n${message}`);
});