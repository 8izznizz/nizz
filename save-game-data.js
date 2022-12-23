// save-game-data.js

import Cookies from 'js-cookie';

export function saveGameData(gameData) {
  // Save the game data to a cookie
  Cookies.set('gameData', gameData);
}

export function loadGameData() {
  // Load the saved game data from the cookie
  return Cookies.get('gameData');
}