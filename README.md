# 🍖 Cookout Dash

A mobile-first side-scrolling game built with React Native and Expo. Navigate through a BBQ-themed obstacle course by tapping to flap and avoid obstacles while collecting delicious food items!

## 🎮 Game Features

### Gameplay
- **Touch Controls**: Tap anywhere on the screen to make your BBQ chef flap upward
- **Physics**: Realistic gravity and momentum system
- **Infinite Scrolling**: Endless side-scrolling gameplay with procedurally generated obstacles
- **Scoring System**: 
  - +1 point for each obstacle passed
  - +2 points for BBQ chicken legs 🍗
  - +3 points for mac & cheese 🧀
  - +5 points for full plate collectibles 🍽️

### Obstacles
- **Flying Dominoes** 🀫 - Spinning obstacles
- **Grill Smoke** 💨 - Pulsing smoke clouds
- **Footballs** 🏈 - Rotating sports equipment
- **Dancing Uncles** 🕺 - Animated party-goers

### Power-ups
- **Red Cup Shield** 🥤 - Temporary invincibility (3 seconds)
- **Potato Salad Pass** 🥗 - Skip the next obstacle

### Visual Features
- **Animated Home Screen** with drifting smoke and dancing silhouettes
- **Smooth Animations** using React Native Animated API
- **Particle Effects** with sparkles for high-value items
- **Dynamic Backgrounds** with scrolling elements
- **Touch-Friendly UI** optimized for mobile devices

### Audio (Placeholder System)
- Flap sound effects
- Collision sounds
- Score collection sounds
- Background music support
- Console logging for sound events (ready for actual audio files)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator (or physical device with Expo Go app)

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd CookoutDash
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on your device**:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## 🎯 How to Play

1. **Start**: Tap the "🔥 PLAY 🔥" button on the home screen
2. **Control**: Tap anywhere on the screen to make your chef flap upward
3. **Avoid**: Navigate around obstacles (dominoes, smoke, footballs, dancing uncles)
4. **Collect**: Grab food items for bonus points
5. **Power-ups**: Collect special items for temporary abilities
6. **Survive**: Don't hit obstacles or boundaries
7. **Score**: Try to beat your high score!

## 🏗️ Project Structure

```
CookoutDash/
├── App.js                 # Main app component with game state management
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js      # Animated home screen
│   │   ├── GameScreen.js      # Main game logic and rendering
│   │   └── GameOverScreen.js  # Game over screen with stats
│   ├── components/
│   │   ├── Player.js          # Animated player character
│   │   ├── Obstacle.js        # Various obstacle types
│   │   └── Collectible.js     # Food items and power-ups
│   ├── utils/
│   │   └── SoundManager.js    # Audio management system
│   └── assets/
│       └── sounds/            # Audio files directory (for future use)
└── README.md
```

## 🔧 Technical Details

### Performance Optimizations
- **Native Driver**: All animations use `useNativeDriver: true` for 60fps performance
- **Efficient Rendering**: Components only re-render when necessary
- **Memory Management**: Proper cleanup of animations and intervals
- **Collision Detection**: Optimized bounding box calculations

### Mobile-First Design
- **Touch-Friendly**: Large touch targets and responsive controls
- **Screen Adaptation**: Dynamic sizing based on device dimensions
- **Performance**: Optimized for mobile hardware constraints
- **Battery Efficient**: Minimal background processing

### React Native Best Practices
- **Functional Components**: Modern React hooks-based architecture
- **State Management**: Efficient local state with useState and useEffect
- **Animation**: Proper use of Animated API for smooth performance
- **Memory Leaks Prevention**: Cleanup of timers and animations

## 🎨 Customization

### Adding Sound Files
1. Place audio files in `src/assets/sounds/`
2. Update `SoundManager.js` to load actual files:
   ```javascript
   this.sounds = {
     flap: await createSound(require('../assets/sounds/flap.mp3')),
     hit: await createSound(require('../assets/sounds/hit.mp3')),
     score: await createSound(require('../assets/sounds/score.mp3')),
     background: await createSound(require('../assets/sounds/background.mp3')),
   };
   ```

### Modifying Game Difficulty
Edit constants in `GameScreen.js`:
```javascript
const GRAVITY = 0.6;              // Increase for faster falling
const JUMP_FORCE = -12;           // Increase magnitude for higher jumps
const GAME_SPEED = 3;             // Increase for faster scrolling
const OBSTACLE_SPAWN_RATE = 0.02; // Increase for more obstacles
```

### Adding New Obstacles
1. Add new type to `obstacleConfig` in `Obstacle.js`
2. Include in spawn array in `GameScreen.js`
3. Add custom animations if desired

## 📱 Supported Platforms

- ✅ iOS (iPhone/iPad)
- ✅ Android (Phone/Tablet)
- ✅ Web (for testing)

## 🐛 Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Audio not working**: Check device volume and audio permissions
3. **Performance issues**: Close other apps and restart Expo
4. **Touch not responsive**: Ensure device touch screen is clean

### Performance Tips
- Close background apps for better performance
- Use physical device for best experience
- Ensure stable internet connection for initial load

## 🤝 Contributing

Feel free to contribute to this project! Some ideas:
- Add new obstacle types
- Implement actual sound effects
- Create new power-ups
- Add particle systems
- Implement leaderboards

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Credits

Built with ❤️ using:
- React Native
- Expo
- React Native Reanimated
- Expo AV
- Expo Linear Gradient

Enjoy playing Cookout Dash! 🍖🎮 