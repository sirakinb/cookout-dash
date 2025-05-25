import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AssetShowcaseScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../../assets/backgrounds/cookout_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Overlay for better text readability */}
      <View style={styles.overlay} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>🍖 Cookout Dash Assets 🍖</Text>
        
        {/* Main Character Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Character</Text>
          <View style={styles.assetContainer}>
            <Image
              source={require('../../assets/characters/main_character.png')}
              style={styles.characterImage}
              resizeMode="contain"
            />
            <Text style={styles.assetLabel}>BBQ Chef</Text>
          </View>
        </View>
        
        {/* Obstacles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Obstacles</Text>
          <View style={styles.assetRow}>
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/obstacles/uncle_dancer.png')}
                style={styles.obstacleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>Dancing Uncle</Text>
            </View>
            
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/obstacles/dominoes.png')}
                style={styles.obstacleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>Dominoes</Text>
            </View>
            
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/obstacles/smoke.png')}
                style={styles.obstacleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>BBQ Smoke</Text>
            </View>
          </View>
        </View>
        
        {/* Collectibles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collectibles</Text>
          <View style={styles.assetRow}>
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/collectibles/mac_cheese.png')}
                style={styles.collectibleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>Mac & Cheese</Text>
              <Text style={styles.pointsLabel}>+3 pts</Text>
            </View>
            
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/collectibles/bbq_chicken.png')}
                style={styles.collectibleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>BBQ Chicken</Text>
              <Text style={styles.pointsLabel}>+2 pts</Text>
            </View>
            
            <View style={styles.assetContainer}>
              <Image
                source={require('../../assets/collectibles/plate.png')}
                style={styles.collectibleImage}
                resizeMode="contain"
              />
              <Text style={styles.assetLabel}>Full Plate</Text>
              <Text style={styles.pointsLabel}>+5 pts</Text>
            </View>
          </View>
        </View>
        
        {/* Background Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background Scene</Text>
          <View style={styles.assetContainer}>
            <Image
              source={require('../../assets/backgrounds/cookout_bg.png')}
              style={styles.backgroundPreview}
              resizeMode="cover"
            />
            <Text style={styles.assetLabel}>Cookout Background</Text>
          </View>
        </View>
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>🏠 Back to Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 2,
  },
  scrollContent: {
    zIndex: 3,
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f39c12',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  assetContainer: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    minWidth: width * 0.25,
  },
  characterImage: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: 10,
  },
  obstacleImage: {
    width: width * 0.15,
    height: width * 0.15,
    marginBottom: 10,
  },
  collectibleImage: {
    width: width * 0.12,
    height: width * 0.12,
    marginBottom: 10,
  },
  backgroundPreview: {
    width: width * 0.6,
    height: width * 0.3,
    borderRadius: 10,
    marginBottom: 10,
  },
  assetLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pointsLabel: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: 'bold',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 