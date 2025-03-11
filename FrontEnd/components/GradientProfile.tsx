import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientComponent() {
  return (
    <LinearGradient
      colors={['#d7044e', '#222222']}
      locations={[0.17, 0.905]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    />
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    position: 'absolute',
    height: 300,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});
