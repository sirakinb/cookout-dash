import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function Player({ x, y, isInvincible }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const invincibilityAnim = useRef(new Animated.Value(1)).current;

  // Bouncing animation for the player
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Invincibility flashing effect
  useEffect(() => {
    if (isInvincible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(invincibilityAnim, {
            toValue: 0.3,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(invincibilityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      invincibilityAnim.setValue(1);
    }
  }, [isInvincible]);

  const bounceTransform = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const scaleTransform = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <Animated.View
      style={[
        styles.player,
        {
          left: x,
          top: y,
          opacity: invincibilityAnim,
          transform: [
            { translateY: bounceTransform },
            { scale: scaleTransform },
          ],
        },
      ]}
    >
      <View style={styles.playerContainer}>
        {/* Main character image */}
        <Image
          source={require('../../assets/characters/main_character.png')}
          style={styles.playerImage}
          resizeMode="contain"
        />

        {/* Invincibility shield effect */}
        {isInvincible && (
          <Animated.View 
            style={[
              styles.shield,
              {
                opacity: invincibilityAnim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [1, 0.5],
                }),
              },
            ]}
          >
            <View style={styles.shieldGlow} />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: 50,
    height: 50,
    zIndex: 10,
  },
  playerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  playerImage: {
    width: 45,
    height: 45,
  },
  shield: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldGlow: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 0, 0.8)',
  },
}); 