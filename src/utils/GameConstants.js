// Game Physics Constants
export const PHYSICS = {
  GRAVITY: 0.6,
  JUMP_FORCE: -12,
  GAME_SPEED: 3,
  PLAYER_SIZE: 40,
  OBSTACLE_SIZE: 40,
  COLLECTIBLE_SIZE: 30,
};

// Spawn Rates (probability per frame)
export const SPAWN_RATES = {
  OBSTACLE: 0.02,
  COLLECTIBLE: 0.015,
  POWER_UP: 0.005,
};

// Scoring System
export const SCORING = {
  OBSTACLE_PASSED: 1,
  CHICKEN_LEG: 2,
  MAC_CHEESE: 3,
  FULL_PLATE: 5,
};

// Power-up Durations (milliseconds)
export const POWER_UPS = {
  SHIELD_DURATION: 3000,
  INVINCIBILITY_FLASH_SPEED: 200,
};

// Animation Timings
export const ANIMATIONS = {
  PLAYER_BOUNCE: 300,
  OBSTACLE_ROTATION: 1000,
  SMOKE_PULSE: 800,
  UNCLE_DANCE: 300,
  COLLECTIBLE_BOUNCE: 1000,
  POWER_UP_GLOW: 800,
  POWER_UP_ROTATION: 2000,
};

// Game Boundaries
export const BOUNDARIES = {
  SPAWN_OFFSET: 50,
  DESPAWN_OFFSET: -50,
  MIN_OBSTACLE_HEIGHT: 100,
  MAX_OBSTACLE_HEIGHT_OFFSET: 200,
};

// UI Constants
export const UI = {
  SCORE_FONT_SIZE: 24,
  TITLE_FONT_SIZE: 48,
  SUBTITLE_FONT_SIZE: 36,
  BUTTON_FONT_SIZE: 18,
  INSTRUCTION_FONT_SIZE: 18,
};

// Colors
export const COLORS = {
  PRIMARY: '#ff6b35',
  SECONDARY: '#f7931e',
  ACCENT: '#ffcc02',
  DANGER: '#e74c3c',
  SUCCESS: '#2ecc71',
  WARNING: '#f39c12',
  INFO: '#3498db',
  DARK: '#2c3e50',
  LIGHT: '#ecf0f1',
};

// Game Difficulty Scaling
export const DIFFICULTY = {
  SPEED_INCREASE_RATE: 0.001, // Speed increase per frame
  MAX_SPEED_MULTIPLIER: 2.0,
  OBSTACLE_FREQUENCY_INCREASE: 0.0001,
  MAX_OBSTACLE_FREQUENCY: 0.05,
};

// Sound Configuration
export const SOUNDS = {
  ENABLED: true,
  VOLUME: {
    EFFECTS: 0.7,
    MUSIC: 0.5,
  },
};

// Performance Settings
export const PERFORMANCE = {
  TARGET_FPS: 60,
  FRAME_TIME: 16, // 1000ms / 60fps
  MAX_OBSTACLES: 10,
  MAX_COLLECTIBLES: 8,
  MAX_POWER_UPS: 3,
}; 