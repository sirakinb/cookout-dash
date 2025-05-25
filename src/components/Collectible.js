import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

export default function Collectible({ x, y, type, points, isPowerUp = false }) {
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

  const getImageSource = () => {
    switch (type) {
      case 'chicken':
        return require('../../assets/collectibles/bbq_chicken.png');
      case 'mac_cheese':
        return require('../../assets/collectibles/mac_cheese.png');
      case 'plate':
        return require('../../assets/collectibles/plate.png');
      default:
        return require('../../assets/collectibles/bbq_chicken.png');
    }
  };

  const getBackgroundColor = () => {
    if (isPowerUp) return '#f39c12';
    switch (type) {
      case 'chicken': return 'rgba(230, 126, 34, 0.2)';
      case 'mac_cheese': return 'rgba(241, 196, 15, 0.2)';
      case 'plate': return 'rgba(46, 204, 113, 0.2)';
      default: return 'rgba(52, 152, 219, 0.2)';
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

      {/* Main collectible container - only for power-ups */}
      {isPowerUp ? (
        <View
          style={[
            styles.collectibleContainer,
            {
              backgroundColor: getBackgroundColor(),
            },
          ]}
        >
          <Image
            source={getImageSource()}
            style={styles.collectibleImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <Image
          source={getImageSource()}
          style={styles.collectibleImageDirect}
          resizeMode="contain"
        />
      )}

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

      {/* Shadow - only for power-ups */}
      {isPowerUp && <View style={styles.shadow} />}

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
    width: 35,
    height: 35,
    zIndex: 6,
  },
  collectibleContainer: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  collectibleImage: {
    width: 28,
    height: 28,
  },
  collectibleImageDirect: {
    width: 35,
    height: 35,
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
    width: 29,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    zIndex: -1,
  },
  glowEffect: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 45,
    height: 45,
    borderRadius: 23,
    zIndex: -1,
  },
  sparkles: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 55,
    height: 55,
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