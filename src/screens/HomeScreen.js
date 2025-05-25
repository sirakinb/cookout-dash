import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ onStartGame, highScore }) {
  const smokeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smoke animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(smokeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(smokeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Title entrance animation
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Button entrance animation
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const smokeTranslateY = smokeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const smokeOpacity = smokeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <LinearGradient
      colors={['#ff6b35', '#f7931e', '#ffcc02']}
      style={styles.container}
    >
      {/* Animated smoke effects */}
      <Animated.View
        style={[
          styles.smoke,
          {
            transform: [{ translateY: smokeTranslateY }],
            opacity: smokeOpacity,
          },
        ]}
      >
        <Text style={styles.smokeText}>💨</Text>
      </Animated.View>
      
      <Animated.View
        style={[
          styles.smoke2,
          {
            transform: [{ translateY: smokeTranslateY }],
            opacity: smokeOpacity,
          },
        ]}
      >
        <Text style={styles.smokeText}>💨</Text>
      </Animated.View>

      {/* Game Logo */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleAnim,
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/backgrounds/cookout_dash_logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Flap through the BBQ!</Text>
      </Animated.View>

      {/* High Score */}
      {highScore > 0 && (
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScoreText}>Best Score: {highScore}</Text>
        </View>
      )}

      {/* Play Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnim,
            transform: [
              {
                scale: buttonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.playButton} onPress={onStartGame}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smoke: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.2,
  },
  smoke2: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.2,
  },
  smokeText: {
    fontSize: 40,
    opacity: 0.6,
  },
  silhouettes: {
    position: 'absolute',
    bottom: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.8,
  },
  silhouette: {
    fontSize: 30,
    opacity: 0.7,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: width * 0.7,
    height: height * 0.25,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  highScoreContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  highScoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  playButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  decorations: {
    position: 'absolute',
    top: height * 0.15,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  decoration: {
    fontSize: 25,
    opacity: 0.8,
  },
}); 