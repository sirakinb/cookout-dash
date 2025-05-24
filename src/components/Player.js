import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

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
        {/* Main character - BBQ chef */}
        <Text style={styles.playerEmoji}>👨‍🍳</Text>
        
        {/* Chef hat with bounce */}
        <Animated.View
          style={[
            styles.hat,
            {
              transform: [{ translateY: bounceTransform }],
            },
          ]}
        >
          <Text style={styles.hatEmoji}>👑</Text>
        </Animated.View>

        {/* Invincibility shield effect */}
        {isInvincible && (
          <View style={styles.shield}>
            <Text style={styles.shieldEmoji}>🛡️</Text>
          </View>
        )}

        {/* Wing flap effect */}
        <Animated.View
          style={[
            styles.wings,
            {
              transform: [
                { 
                  rotateZ: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '15deg'],
                  })
                },
              ],
            },
          ]}
        >
          <Text style={styles.wingEmoji}>🔥</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 10,
  },
  playerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  playerEmoji: {
    fontSize: 32,
    textAlign: 'center',
  },
  hat: {
    position: 'absolute',
    top: -15,
    left: 5,
  },
  hatEmoji: {
    fontSize: 16,
  },
  shield: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldEmoji: {
    fontSize: 40,
    opacity: 0.8,
  },
  wings: {
    position: 'absolute',
    top: 10,
    right: -10,
  },
  wingEmoji: {
    fontSize: 20,
    opacity: 0.7,
  },
}); 