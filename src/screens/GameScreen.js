import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Player from '../components/Player';
import Obstacle from '../components/Obstacle';
import Collectible from '../components/Collectible';
import { SoundManager } from '../utils/SoundManager';
import { GAME_CONSTANTS } from '../utils/GameConstants';

const { width, height } = Dimensions.get('window');

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const BASE_GAME_SPEED = 3;
const OBSTACLE_SPAWN_RATE = 0.02;
const COLLECTIBLE_SPAWN_RATE = 0.015;

// Speed increase settings - very gradual
const SPEED_INCREASE_RATE = 0.0005; // Increase per frame (even smaller)
const MAX_SPEED_MULTIPLIER = 2.0; // Maximum speed (2x original)
const SPAWN_RATE_INCREASE = 0.00003; // Spawn rate increase per frame (smaller)

export default function GameScreen({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);
  const [playerY, setPlayerY] = useState(height / 2);
  const [playerVelocity, setPlayerVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [isInvincible, setIsInvincible] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(BASE_GAME_SPEED);
  const [currentObstacleSpawnRate, setCurrentObstacleSpawnRate] = useState(OBSTACLE_SPAWN_RATE);

  const gameLoopRef = useRef();
  const frameCountRef = useRef(0);
  const backgroundScrollRef = useRef(new Animated.Value(0)).current;
  const soundManager = useRef(new SoundManager()).current;

  // Initialize sound manager and start background music
  useEffect(() => {
    const initAudio = async () => {
      await soundManager.loadSounds();
      await soundManager.playBackgroundMusic();
    };
    
    initAudio();
    
    return () => {
      soundManager.stopBackgroundMusic();
      soundManager.cleanup();
    };
  }, []);

  // Background scrolling animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(backgroundScrollRef, {
        toValue: -width,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const jump = useCallback(() => {
    if (gameRunning) {
      setPlayerVelocity(JUMP_FORCE);
      soundManager.playFlap();
    }
  }, [gameRunning, soundManager]);

  const spawnObstacle = useCallback(() => {
    const obstacleTypes = ['domino', 'smoke', 'football', 'uncle'];
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const newObstacle = {
      id: Date.now() + Math.random(),
      x: width + 50,
      y: Math.random() * (height - 200) + 100,
      type,
      passed: false,
    };
    setObstacles(prev => [...prev, newObstacle]);
  }, []);

  const spawnCollectible = useCallback(() => {
    const collectibleTypes = [
      { type: 'chicken', points: 2 },
      { type: 'mac_cheese', points: 3 },
      { type: 'plate', points: 5 },
    ];
    const collectible = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];
    const newCollectible = {
      id: Date.now() + Math.random(),
      x: width + 50,
      y: Math.random() * (height - 200) + 100,
      ...collectible,
    };
    setCollectibles(prev => [...prev, newCollectible]);
  }, []);

  const spawnPowerUp = useCallback(() => {
    if (Math.random() < 0.005) { // 0.5% chance
      const powerUpTypes = [
        { type: 'shield', duration: 3000 },
        { type: 'pass', effect: 'skip' },
      ];
      const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      const newPowerUp = {
        id: Date.now() + Math.random(),
        x: width + 50,
        y: Math.random() * (height - 200) + 100,
        ...powerUp,
      };
      setPowerUps(prev => [...prev, newPowerUp]);
    }
  }, []);

  const checkCollisions = useCallback(() => {
    const playerBounds = {
      x: 80,
      y: playerY,
      width: 40,
      height: 40,
    };

    // Check obstacle collisions
    obstacles.forEach(obstacle => {
      const obstacleBounds = {
        x: obstacle.x,
        y: obstacle.y,
        width: 40,
        height: 40,
      };

      if (
        !isInvincible &&
        playerBounds.x < obstacleBounds.x + obstacleBounds.width &&
        playerBounds.x + playerBounds.width > obstacleBounds.x &&
        playerBounds.y < obstacleBounds.y + obstacleBounds.height &&
        playerBounds.y + playerBounds.height > obstacleBounds.y
      ) {
        // Collision detected - use setTimeout to avoid setState during render
        setTimeout(() => {
          setGameRunning(false);
          soundManager.playHit();
          soundManager.playGameOver();
          onGameOver(score);
        }, 0);
        return;
      }

      // Check if obstacle was passed
      if (!obstacle.passed && obstacle.x + 40 < playerBounds.x) {
        obstacle.passed = true;
        setScore(prev => prev + 1);
      }
    });

    // Check collectible collisions
    setCollectibles(prev => 
      prev.filter(collectible => {
        const collectibleBounds = {
          x: collectible.x,
          y: collectible.y,
          width: 30,
          height: 30,
        };

        if (
          playerBounds.x < collectibleBounds.x + collectibleBounds.width &&
          playerBounds.x + playerBounds.width > collectibleBounds.x &&
          playerBounds.y < collectibleBounds.y + collectibleBounds.height &&
          playerBounds.y + playerBounds.height > collectibleBounds.y
        ) {
          setScore(prev => prev + collectible.points);
          soundManager.playCollect();
          return false; // Remove collectible
        }
        return true;
      })
    );

    // Check power-up collisions
    setPowerUps(prev => 
      prev.filter(powerUp => {
        const powerUpBounds = {
          x: powerUp.x,
          y: powerUp.y,
          width: 30,
          height: 30,
        };

        if (
          playerBounds.x < powerUpBounds.x + powerUpBounds.width &&
          playerBounds.x + playerBounds.width > powerUpBounds.x &&
          playerBounds.y < powerUpBounds.y + powerUpBounds.height &&
          playerBounds.y + playerBounds.height > powerUpBounds.y
        ) {
          if (powerUp.type === 'shield') {
            setIsInvincible(true);
            setTimeout(() => setIsInvincible(false), powerUp.duration);
          } else if (powerUp.type === 'pass') {
            setObstacles(prev => prev.slice(1)); // Remove next obstacle
          }
          soundManager.playScore();
          return false; // Remove power-up
        }
        return true;
      })
    );
  }, [playerY, obstacles, collectibles, powerUps, isInvincible, score, soundManager, onGameOver]);

  // Main game loop
  useEffect(() => {
    if (!gameRunning) return;

    gameLoopRef.current = setInterval(() => {
      // Update player physics
      setPlayerVelocity(prev => prev + GRAVITY);
      setPlayerY(prev => {
        const newY = prev + playerVelocity;
        // Check boundaries
        if (newY <= 0 || newY >= height - 40) {
          setTimeout(() => {
            setGameRunning(false);
            soundManager.playHit();
            soundManager.playGameOver();
            onGameOver(score);
          }, 0);
          return prev;
        }
        return newY;
      });

      // Update obstacles
      setObstacles(prev => 
        prev
          .map(obstacle => ({ ...obstacle, x: obstacle.x - gameSpeed }))
          .filter(obstacle => obstacle.x > -50)
      );

      // Update collectibles
      setCollectibles(prev => 
        prev
          .map(collectible => ({ ...collectible, x: collectible.x - gameSpeed }))
          .filter(collectible => collectible.x > -50)
      );

      // Update power-ups
      setPowerUps(prev => 
        prev
          .map(powerUp => ({ ...powerUp, x: powerUp.x - gameSpeed }))
          .filter(powerUp => powerUp.x > -50)
      );

      // Spawn new obstacles
      if (Math.random() < currentObstacleSpawnRate) {
        spawnObstacle();
      }

      // Spawn new collectibles
      if (Math.random() < COLLECTIBLE_SPAWN_RATE) {
        spawnCollectible();
      }

      // Spawn power-ups
      spawnPowerUp();

      // Check collisions
      checkCollisions();

      // Increment frame counter and update game speed gradually
      frameCountRef.current += 1;
      
      // Calculate new speed (very gradual increase)
      const speedMultiplier = Math.min(
        1 + (frameCountRef.current * SPEED_INCREASE_RATE),
        MAX_SPEED_MULTIPLIER
      );
      setGameSpeed(BASE_GAME_SPEED * speedMultiplier);

      // Calculate new spawn rate (very gradual increase)
      const spawnMultiplier = Math.min(
        1 + (frameCountRef.current * SPAWN_RATE_INCREASE),
        1.5 // Max 1.5x spawn rate
      );
      setCurrentObstacleSpawnRate(OBSTACLE_SPAWN_RATE * spawnMultiplier);
    }, 16); // ~60 FPS

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameRunning, playerVelocity, spawnObstacle, spawnCollectible, spawnPowerUp, checkCollisions, score, soundManager, onGameOver, gameSpeed, currentObstacleSpawnRate]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={require('../../assets/backgrounds/cookout_bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Background overlay for better visibility */}
        <View style={styles.backgroundOverlay} />

        {/* Scrolling background elements */}
        <Animated.View
          style={[
            styles.backgroundElements,
            {
              transform: [{ translateX: backgroundScrollRef }],
            },
          ]}
        >
          <Text style={styles.bgElement}>🌳</Text>
          <Text style={styles.bgElement}>🏠</Text>
          <Text style={styles.bgElement}>🌳</Text>
        </Animated.View>

        {/* Score display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          {gameSpeed > BASE_GAME_SPEED * 1.2 && (
            <Text style={styles.speedText}>
              🔥 Speed: {(gameSpeed / BASE_GAME_SPEED).toFixed(1)}x
            </Text>
          )}
          {isInvincible && (
            <Text style={styles.powerUpText}>🛡️ SHIELD ACTIVE</Text>
          )}
        </View>

        {/* Player */}
        <Player x={80} y={playerY} isInvincible={isInvincible} />

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <Obstacle
            key={obstacle.id}
            x={obstacle.x}
            y={obstacle.y}
            type={obstacle.type}
          />
        ))}

        {/* Collectibles */}
        {collectibles.map(collectible => (
          <Collectible
            key={collectible.id}
            x={collectible.x}
            y={collectible.y}
            type={collectible.type}
            points={collectible.points}
          />
        ))}

        {/* Power-ups */}
        {powerUps.map(powerUp => (
          <Collectible
            key={powerUp.id}
            x={powerUp.x}
            y={powerUp.y}
            type={powerUp.type}
            isPowerUp={true}
          />
        ))}

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Tap to flap!</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 2,
  },
  backgroundElements: {
    position: 'absolute',
    top: height * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 2,
    zIndex: 3,
  },
  bgElement: {
    fontSize: 40,
    opacity: 0.6,
  },
  scoreContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 100,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  speedText: {
    fontSize: 16,
    color: '#ffff00',
    fontWeight: 'bold',
    marginTop: 5,
  },
  powerUpText: {
    fontSize: 16,
    color: '#ffff00',
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  instructionsText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});