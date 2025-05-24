import { Audio } from 'expo-av';

export class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = true;
  }

  async loadSounds() {
    try {
      // Set audio mode for games
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      // Since we don't have actual sound files, we'll create placeholder sounds
      // In a real app, you would load actual sound files here
      this.sounds = {
        flap: null,
        hit: null,
        score: null,
        background: null,
      };

      console.log('Sound manager initialized (placeholder mode)');
    } catch (error) {
      console.warn('Failed to load sounds:', error);
      this.isEnabled = false;
    }
  }

  async playFlap() {
    if (!this.isEnabled) return;
    
    try {
      // Placeholder for flap sound
      // In a real app: await this.sounds.flap?.replayAsync();
      console.log('🎵 Flap sound played');
    } catch (error) {
      console.warn('Failed to play flap sound:', error);
    }
  }

  async playHit() {
    if (!this.isEnabled) return;
    
    try {
      // Placeholder for hit sound
      // In a real app: await this.sounds.hit?.replayAsync();
      console.log('🎵 Hit sound played');
    } catch (error) {
      console.warn('Failed to play hit sound:', error);
    }
  }

  async playScore() {
    if (!this.isEnabled) return;
    
    try {
      // Placeholder for score sound
      // In a real app: await this.sounds.score?.replayAsync();
      console.log('🎵 Score sound played');
    } catch (error) {
      console.warn('Failed to play score sound:', error);
    }
  }

  async playBackgroundMusic() {
    if (!this.isEnabled) return;
    
    try {
      // Placeholder for background music
      // In a real app: await this.sounds.background?.setIsLoopingAsync(true);
      // await this.sounds.background?.playAsync();
      console.log('🎵 Background music started');
    } catch (error) {
      console.warn('Failed to play background music:', error);
    }
  }

  async stopBackgroundMusic() {
    if (!this.isEnabled) return;
    
    try {
      // Placeholder for stopping background music
      // In a real app: await this.sounds.background?.stopAsync();
      console.log('🎵 Background music stopped');
    } catch (error) {
      console.warn('Failed to stop background music:', error);
    }
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopBackgroundMusic();
    }
  }

  cleanup() {
    try {
      // Cleanup all sounds
      Object.values(this.sounds).forEach(async (sound) => {
        if (sound) {
          await sound.unloadAsync();
        }
      });
      console.log('Sound manager cleaned up');
    } catch (error) {
      console.warn('Failed to cleanup sounds:', error);
    }
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