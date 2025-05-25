import { Audio } from 'expo-av';

export class SoundManager {
  constructor() {
    this.isEnabled = true;
    this.sounds = {};
  }

  async loadSounds() {
    try {
      console.log('🎵 Loading sound effects...');
      
      // Set audio mode for iOS
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Load background music
      const { sound: bgMusic } = await Audio.Sound.createAsync(
        require('../../assets/audio/background_music.mp3'),
        {
          isLooping: true,
          volume: 0.2, // Lower volume for background
        }
      );
      this.sounds.backgroundMusic = bgMusic;

      // TODO: Add these sound files to assets/audio/ folder:
      // - collect.mp3 (satisfaction sound for collecting items)
      // - game_over.mp3 (whomp whomp sound for losing)
      
      // Uncomment these when you add the sound files:
      /*
      const { sound: collectSound } = await Audio.Sound.createAsync(
        require('../../assets/audio/collect.mp3'),
        { volume: 0.6 }
      );
      this.sounds.collect = collectSound;

      const { sound: gameOverSound } = await Audio.Sound.createAsync(
        require('../../assets/audio/game_over.mp3'),
        { volume: 0.8 }
      );
      this.sounds.gameOver = gameOverSound;
      */

      console.log('🎵 Sound effects loaded successfully!');
    } catch (error) {
      console.warn('Failed to load sounds:', error);
      this.isEnabled = false;
    }
  }

  async playBackgroundMusic() {
    if (this.isEnabled && this.sounds.backgroundMusic) {
      try {
        await this.sounds.backgroundMusic.playAsync();
        console.log('🎵 Background music started');
      } catch (error) {
        console.warn('Failed to play background music:', error);
      }
    }
  }

  async stopBackgroundMusic() {
    if (this.isEnabled && this.sounds.backgroundMusic) {
      try {
        await this.sounds.backgroundMusic.stopAsync();
        console.log('🎵 Background music stopped');
      } catch (error) {
        console.warn('Failed to stop background music:', error);
      }
    }
  }

  async playFlap() {
    if (this.isEnabled) {
      // For now, just console log - you can add actual flap sound file later
      console.log('🎵 Flap sound');
    }
  }

  async playScore() {
    if (this.isEnabled) {
      // For now, just console log - you can add actual score sound file later
      console.log('🎵 Score sound');
    }
  }

  async playCollect() {
    if (this.isEnabled && this.sounds.collect) {
      try {
        // Reset to beginning and play
        await this.sounds.collect.setPositionAsync(0);
        await this.sounds.collect.playAsync();
        console.log('🎵 Collect sound played');
      } catch (error) {
        console.warn('Failed to play collect sound:', error);
      }
    } else if (this.isEnabled) {
      // Placeholder until sound file is added
      console.log('🎵 *DING* Collect sound (placeholder)');
    }
  }

  async playGameOver() {
    if (this.isEnabled && this.sounds.gameOver) {
      try {
        // Reset to beginning and play
        await this.sounds.gameOver.setPositionAsync(0);
        await this.sounds.gameOver.playAsync();
        console.log('🎵 Game over sound played');
      } catch (error) {
        console.warn('Failed to play game over sound:', error);
      }
    } else if (this.isEnabled) {
      // Placeholder until sound file is added
      console.log('🎵 *WHOMP WHOMP WHOMP* Game over sound (placeholder)');
    }
  }

  async playHit() {
    if (this.isEnabled) {
      // For now, just console log - you can add actual hit sound file later
      console.log('🎵 Hit sound');
    }
  }

  async cleanup() {
    console.log('🎵 Cleaning up sound manager...');
    
    // Clean up all sounds
    const soundKeys = ['backgroundMusic', 'collect', 'gameOver'];
    
    for (const key of soundKeys) {
      if (this.sounds[key]) {
        try {
          await this.sounds[key].unloadAsync();
          console.log(`🎵 Unloaded ${key} sound`);
        } catch (error) {
          console.warn(`Error unloading ${key} sound:`, error);
        }
      }
    }
    
    this.sounds = {};
    console.log('🎵 Sound manager cleaned up');
  }
}

// Helper function to create sound objects (for when you have actual sound files)
export const createSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    return sound;
  } catch (error) {
    console.warn('Failed to create sound:', error);
    return null;
  }
};

// Example usage for loading actual sound files:
/*
async loadSounds() {
  try {
    this.sounds = {
      flap: await createSound(require('../assets/sounds/flap.mp3')),
      hit: await createSound(require('../assets/sounds/hit.mp3')),
      score: await createSound(require('../assets/sounds/score.mp3')),
      background: await createSound(require('../assets/sounds/background.mp3')),
    };
  } catch (error) {
    console.warn('Failed to load sounds:', error);
    this.isEnabled = false;
  }
}
*/ 