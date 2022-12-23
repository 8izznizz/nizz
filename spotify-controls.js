const spotifyApi = new SpotifyWebApi();

const accessToken = 'YOUR_ACCESS_TOKEN';
const playlistId = 'YOUR_PLAYLIST_ID';

export function connectToPlayer() {
  return new Promise((resolve, reject) => {
    const player = new Spotify.Player({
      name: 'My Player',
      getOAuthToken: cb => { cb(accessToken); }
    });

    player.on('ready', () => {
      console.log('Ready with Device ID', player.device_id);

      // Set the specific playlist as the playback queue
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.play({ device_id: player.device_id, context_uri: `spotify:playlist:${playlistId}` })
        .then(() => {
          console.log('Playback queue set to playlist');
          resolve(player);
        })
        .catch(error => {
          console.log('Error setting playback queue:', error);
          reject(error);
        });
    });

    player.on('not_ready', error => {
      console.log('Device ID has gone offline', error);
      reject(error);
    });

    player.connect();
  });
}

export function play(player) {
  player.resume().then(() => {
    console.log('Playing!');
  });
}

export function pause(player) {
    player.pause().then(() => {
      console.log('Paused!');
    });
  }
  
  export function skipToNextTrack(player) {
    player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
  }
  
  export function skipToPreviousTrack(player) {
    player.previousTrack().then(() => {
      console.log('Skipped to previous track!');
    });
  }
  
  export function setVolume(player, volume) {
    player.setVolume(volume).then(() => {
      console.log(`Volume set to ${volume}!`);
    });
  }
  
  export function addPlayerEventListener(player, eventName, callback) {
      player.addListener(eventName, callback);
    }
    
    export function removePlayerEventListener(player, eventName, callback) {
      player.removeListener(eventName, callback);
    }