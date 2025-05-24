import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [gameState, setGameState] = useState('home'); // 'home', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameKey, setGameKey] = useState(0); // Force remount of GameScreen

  const startGame = () => {
    setScore(0);
    setGameKey(prev => prev + 1); // Force GameScreen to remount
    setGameState('playing');
  };

  const endGame = (finalScore) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
    setGameState('gameOver');
  };

  const goHome = () => {
    setGameState('home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {gameState === 'home' && (
        <HomeScreen onStartGame={startGame} highScore={highScore} />
      )}
      {gameState === 'playing' && (
        <GameScreen key={gameKey} onGameOver={endGame} />
      )}
      {gameState === 'gameOver' && (
        <GameOverScreen 
          score={score} 
          highScore={highScore}
          onRestart={startGame}
          onHome={goHome}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
