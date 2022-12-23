import { game } from './game.js';

export function createPlayerGroup(numPlayers) {
  const playerGroup = game.physics.add.group();
  for (let i = 0; i < numPlayers; i++) {
    playerGroup.create(0, 0, 'player');
  }
  return playerGroup;
}

export function randomizeVisiblePlayers(playerGroup, numVisible) {
  // Get the player objects in the playerGroup
  const playerObjects = playerGroup.getChildren();

  // Shuffle the player objects using the Fisher-Yates shuffle algorithm
  for (let i = playerObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playerObjects[i], playerObjects[j]] = [playerObjects[j], playerObjects[i]];
  }

  // Select numVisible player objects at random from the shuffled list
  const selectedPlayerObjects = [];
  for (let i = 0; i < numVisible; i++) {
    const playerIndex = Math.floor(Math.random() * playerObjects.length);
    selectedPlayerObjects.push(playerObjects[playerIndex]);
  }

  // Show the selected player objects
  for (let i = 0; i < selectedPlayerObjects.length; i++) {
    selectedPlayerObjects[i].setVisible(true);
  }

  // Hide the remaining player objects
  for (let i = 0; i < playerObjects.length; i++) {
    if (!selectedPlayerObjects.includes(playerObjects[i])) {
      playerObjects[i].setVisible(false);
      playerObjects[i].setActive(false);
    }
  }
}