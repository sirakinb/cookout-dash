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

  async playHit() {
    if (this.isEnabled) {
      // For now, just console log - you can add actual hit sound file later
      console.log('🎵 Hit sound');
    }
  }

  async cleanup() {
    console.log('🎵 Cleaning up sound manager...');
    if (this.sounds.backgroundMusic) {
      try {
        await this.sounds.backgroundMusic.unloadAsync();
      } catch (error) {
        console.warn('Error unloading background music:', error);
      }
    }
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