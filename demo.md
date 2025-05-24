# 🎮 Cookout Dash - Quick Demo Guide

## 🚀 Quick Start (30 seconds)

1. **Start the game**:
   ```bash
   cd CookoutDash
   npm start
   ```

2. **Open on your device**:
   - **Mobile**: Scan QR code with Expo Go app
   - **Web**: Press `w` in terminal for instant browser preview
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal

## 🎯 Demo Walkthrough

### Home Screen (5 seconds)
- Beautiful animated BBQ-themed background
- Drifting smoke effects
- Dancing silhouettes
- Large "🔥 PLAY 🔥" button

### Gameplay (2 minutes)
1. **Tap to flap** - Touch anywhere to make chef fly up
2. **Avoid obstacles**:
   - 🀫 Spinning dominoes
   - 💨 Pulsing smoke clouds
   - 🏈 Rotating footballs
   - 🕺 Dancing uncles
3. **Collect food**:
   - 🍗 Chicken legs (+2 points)
   - 🧀 Mac & cheese (+3 points)
   - 🍽️ Full plates (+5 points)
4. **Grab power-ups**:
   - 🥤 Red cup shield (invincibility)
   - 🥗 Potato salad pass (skip obstacle)

### Game Over Screen (10 seconds)
- Final score display
- Fun BBQ-themed stats
- Motivational messages
- "Try Again" and "Home" buttons

## 🎨 Visual Highlights

- **Smooth 60fps animations** using React Native Animated
- **Particle effects** with sparkles on high-value items
- **Dynamic backgrounds** with scrolling elements
- **Touch-responsive UI** optimized for mobile
- **Gradient backgrounds** with cookout color themes

## 🔧 Quick Customization

Want to modify the game? Edit these files:

- **Difficulty**: `src/utils/GameConstants.js`
- **Player character**: `src/components/Player.js`
- **New obstacles**: `src/components/Obstacle.js`
- **Scoring system**: `src/screens/GameScreen.js`

## 📱 Best Experience

- **Physical device** recommended for touch controls
- **Portrait orientation** for optimal gameplay
- **Good lighting** to see colorful animations
- **Volume up** for sound effect feedback (console logs)

## 🎯 Demo Tips

1. **Start easy** - Just tap to get a feel for the physics
2. **Watch patterns** - Obstacles have predictable spawn rates
3. **Collect strategically** - High-value items are worth the risk
4. **Use power-ups** - Shield makes you temporarily invincible
5. **Beat your score** - Game tracks high scores automatically

## 🚀 Performance

The game is optimized for:
- **60fps** smooth gameplay
- **Low battery usage** with efficient animations
- **Quick loading** with minimal assets
- **Responsive controls** with immediate touch feedback

Ready to play? Run `npm start` and enjoy Cookout Dash! 🍖🎮 