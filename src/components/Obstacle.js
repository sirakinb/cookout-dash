import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const obstacleConfig = {
  domino: { emoji: '🀫', size: 35, color: '#2c3e50' },
  smoke: { emoji: '💨', size: 40, color: '#95a5a6' },
  football: { emoji: '🏈', size: 30, color: '#8b4513' },
  uncle: { emoji: '🕺', size: 35, color: '#e74c3c' },
};

export default function Obstacle({ x, y, type }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const config = obstacleConfig[type] || obstacleConfig.domino;

  useEffect(() => {
    // Different animations for different obstacle types
    if (type === 'domino' || type === 'football') {
      // Spinning animation for dominoes and footballs
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else if (type === 'smoke') {
      // Pulsing animation for smoke
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (type === 'uncle') {
      // Dancing animation for uncle
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [type]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.obstacle,
        {
          left: x,
          top: y,
          transform: [
            { rotate: rotation },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <View style={[styles.obstacleContainer, { backgroundColor: config.color }]}>
        <Text style={[styles.obstacleEmoji, { fontSize: config.size }]}>
          {config.emoji}
        </Text>
      </View>
      
      {/* Shadow effect */}
      <View style={styles.shadow} />
      
      {/* Special effects for certain obstacles */}
      {type === 'smoke' && (
        <Animated.View
          style={[
            styles.smokeTrail,
            {
              opacity: scaleAnim.interpolate({
                inputRange: [0.8, 1.2],
                outputRange: [0.3, 0.7],
              }),
            },
          ]}
        >
          <Text style={styles.smokeTrailEmoji}>💨</Text>
        </Animated.View>
      )}
      
      {type === 'uncle' && (
        <View style={styles.danceFloor}>
          <Text style={styles.musicNote}>🎵</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 5,
  },
  obstacleContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  obstacleEmoji: {
    textAlign: 'center',
  },
  shadow: {
    position: 'absolute',
    bottom: -5,
    left: 5,
    width: 30,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    zIndex: -1,
  },
  smokeTrail: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smokeTrailEmoji: {
    fontSize: 25,
    opacity: 0.5,
  },
  danceFloor: {
    position: 'absolute',
    bottom: -15,
    left: -5,
    width: 50,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicNote: {
    fontSize: 12,
    opacity: 0.7,
  },
}); 