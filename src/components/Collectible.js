import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Collectible({ x, y, type, emoji, points, isPowerUp = false }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bouncing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glowing effect for power-ups
    if (isPowerUp) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotation for power-ups
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isPowerUp]);

  const bounceTransform = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const scaleTransform = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getBackgroundColor = () => {
    if (isPowerUp) return '#f39c12';
    switch (type) {
      case 'chicken': return '#e67e22';
      case 'mac_cheese': return '#f1c40f';
      case 'plate': return '#2ecc71';
      default: return '#3498db';
    }
  };

  return (
    <Animated.View
      style={[
        styles.collectible,
        {
          left: x,
          top: y,
          transform: [
            { translateY: bounceTransform },
            { scale: scaleTransform },
            ...(isPowerUp ? [{ rotate: rotation }] : []),
          ],
        },
      ]}
    >
      {/* Glow effect for power-ups */}
      {isPowerUp && (
        <Animated.View
          style={[
            styles.glowEffect,
            {
              opacity: glowOpacity,
              backgroundColor: '#f39c12',
            },
          ]}
        />
      )}

      {/* Main collectible container */}
      <View
        style={[
          styles.collectibleContainer,
          {
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <Text style={styles.collectibleEmoji}>{emoji}</Text>
      </View>

      {/* Points indicator */}
      {!isPowerUp && points && (
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+{points}</Text>
        </View>
      )}

      {/* Power-up indicator */}
      {isPowerUp && (
        <View style={styles.powerUpIndicator}>
          <Text style={styles.powerUpText}>⚡</Text>
        </View>
      )}

      {/* Shadow */}
      <View style={styles.shadow} />

      {/* Sparkle effects for high-value items */}
      {(points >= 5 || isPowerUp) && (
        <Animated.View
          style={[
            styles.sparkles,
            {
              opacity: bounceAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.5, 1, 0.5],
              }),
            },
          ]}
        >
          <Text style={styles.sparkleEmoji}>✨</Text>
          <Text style={[styles.sparkleEmoji, styles.sparkle2]}>✨</Text>
          <Text style={[styles.sparkleEmoji, styles.sparkle3]}>✨</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  collectible: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 6,
  },
  collectibleContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  collectibleEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
  pointsContainer: {
    position: 'absolute',
    top: -15,
    right: -10,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 20,
  },
  pointsText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  powerUpIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#9b59b6',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerUpText: {
    fontSize: 10,
    color: '#fff',
  },
  shadow: {
    position: 'absolute',
    bottom: -3,
    left: 3,
    width: 24,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    zIndex: -1,
  },
  glowEffect: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: -1,
  },
  sparkles: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleEmoji: {
    position: 'absolute',
    fontSize: 12,
  },
  sparkle2: {
    top: -5,
    right: 5,
  },
  sparkle3: {
    bottom: -5,
    left: 5,
  },
}); 