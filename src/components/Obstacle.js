import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';

const obstacleConfig = {
  domino: { size: 35, color: 'rgba(44, 62, 80, 0.2)' },
  smoke: { size: 40, color: 'rgba(149, 165, 166, 0.2)' },
  football: { size: 30, color: 'rgba(139, 69, 19, 0.2)' },
  uncle: { size: 35, color: 'rgba(231, 76, 60, 0.2)' },
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

  const getImageSource = () => {
    switch (type) {
      case 'domino':
        return require('../../assets/obstacles/dominoes.png');
      case 'smoke':
        return require('../../assets/obstacles/smoke.png');
      case 'uncle':
        return require('../../assets/obstacles/uncle_dancer.png');
      case 'football':
        // Using dominoes as fallback since we don't have football asset
        return require('../../assets/obstacles/dominoes.png');
      default:
        return require('../../assets/obstacles/dominoes.png');
    }
  };

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
      <Image
        source={getImageSource()}
        style={[styles.obstacleImage, { width: config.size, height: config.size }]}
        resizeMode="contain"
      />
      
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
  obstacleImage: {
    // Dynamic width and height set in component
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