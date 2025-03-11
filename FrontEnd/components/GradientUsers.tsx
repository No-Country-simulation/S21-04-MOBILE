import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientComponent = () => {
  return (
    <LinearGradient
      colors={['#FC1768', 'rgba(252, 23, 104, 0.2)', 'rgba(252, 23, 104, 0.6)']}
      start={{ x: 0.5, y: 0 }} // Para un gradiente de arriba hacia abajo (180deg)
      end={{ x: 0.5, y: 1 }}    // Esto controla la dirección del gradiente
      style={styles.gradient}
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    position: 'absolute',
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default GradientComponent;