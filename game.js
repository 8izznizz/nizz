// game.js
import { createGame } from './game-module';
import { createPlayerGroup } from './player-customization';
import { randomizeVisiblePlayers } from './player-customization';
import { connectToPlayer, addPlayerEventListener, skipToNextTrack, skipToPreviousTrack, setVolume } from './spotify-controls';
import { levelData } from './level';

const game = createGame({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: function() {
      this.load.image('player', './assets/player.png');
      this.load.image('platform', './assets/platform.png');
    },
    create: function() {
      const playerGroup = createPlayerGroup(1);
      randomizeVisiblePlayers(playerGroup, 1);
      const platforms = this.physics.add.staticGroup();

      for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
          if (levelData[y][x] === 1) {
            platforms.create(x * 64, y * 64, 'platform');
          }
        }
      }

      // Set up the player character's physics and controls
      this.physics.add.collider(playerGroup, platforms);
      const player = playerGroup.getChildren()[0];
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.cursors = this.input.keyboard.createCursorKeys();

      // Connect to the Spotify player and set up player controls
      connectToPlayer()
        .then(player => {
          addPlayerEventListener(player, 'player_state_changed', state => {
            console.log('Player state changed:', state);
          });

          this.cursors.up.on('down', () => {
            skipToNextTrack(player);
          });
          this.cursors.down.on('down', () => {
            skipToPreviousTrack(player);
          });
          this.cursors.left.on('down', () => {
            setVolume(player, player.getVolume() - 0.1);
          });
          this.cursors.right.on('down', () => {
            setVolume(player, player.getVolume() + 0.1);
          });
        })
        .catch(error => {
          console.log('Error connecting to player:', error);
        });
    },

    update: function() {
      // Update the player character's movement based on keyboard input
      const player = playerGroup.getChildren()[0];
      if (this.cursors.left.isDown) {
        player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        player.setVelocityX(160);
      } else {
        player.setVelocityX(0);
      }
      if (this.cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }
})