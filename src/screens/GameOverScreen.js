import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function GameOverScreen({ score, highScore, onRestart, onHome }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Button animation with delay
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const isNewHighScore = score === highScore && score > 0;

  return (
    <LinearGradient
      colors={['#2c3e50', '#34495e', '#95a5a6']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.gameOverContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Game Over Title */}
        <Text style={styles.gameOverTitle}>GAME OVER</Text>
        
        {/* Sad cookout emoji */}
        <Text style={styles.sadEmoji}>😭</Text>
        
        {/* Score display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Final Score</Text>
          <Text style={styles.finalScore}>{score}</Text>
          
          {isNewHighScore && (
            <View style={styles.newHighScoreContainer}>
              <Text style={styles.newHighScoreText}>NEW HIGH SCORE!</Text>
            </View>
          )}
          
          {highScore > 0 && !isNewHighScore && (
            <Text style={styles.highScoreText}>Best: {highScore}</Text>
          )}
        </View>

        {/* Motivational message */}
        <Text style={styles.motivationText}>
          {score === 0 
            ? "Don't give up! Every BBQ master started somewhere!" 
            : score < 10 
            ? "Getting warmed up! Try again!" 
            : score < 25 
            ? "Not bad! You're getting the hang of it!" 
            : score < 50 
            ? "Great job! You're a cookout champion!" 
            : "AMAZING! You're the BBQ legend!"
          }
        </Text>

        {/* Action buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
              transform: [
                {
                  translateY: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.retryButton} onPress={onRestart}>
            <Text style={styles.retryButtonText}>TRY AGAIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={onHome}>
            <Text style={styles.homeButtonText}>HOME</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Fun stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>BBQ Stats:</Text>
          <Text style={styles.statText}>
            Chicken legs missed: {Math.max(0, 10 - Math.floor(score / 2))}
          </Text>
          <Text style={styles.statText}>
            Footballs dodged: {Math.floor(score / 3)}
          </Text>
          <Text style={styles.statText}>
            Dancing uncles avoided: {Math.floor(score / 5)}
          </Text>
        </View>
      </Animated.View>

      {/* Background decorations */}
      <View style={styles.backgroundDecorations}>
        <Text style={styles.bgDecoration}>💨</Text>
        <Text style={styles.bgDecoration}>🍖</Text>
        <Text style={styles.bgDecoration}>💨</Text>
        <Text style={styles.bgDecoration}>🥤</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    width: width * 0.9,
    zIndex: 10,
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  sadEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#bdc3c7',
    marginBottom: 5,
  },
  finalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f39c12',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  newHighScoreContainer: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 10,
  },
  newHighScoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  highScoreText: {
    fontSize: 16,
    color: '#95a5a6',
    marginTop: 10,
  },
  motivationText: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#34495e',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 25,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    color: '#f39c12',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statText: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 5,
  },
  backgroundDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.1,
    zIndex: 1,
  },
  bgDecoration: {
    fontSize: 50,
    position: 'absolute',
  },
}); 