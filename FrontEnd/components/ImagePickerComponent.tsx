import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ImagePickerExample({
  disabled = false,
  uri,
  size = 'large',
}: {
  disabled?: boolean;
  uri?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  const [image, setImage] = useState(uri || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.imageProfile,
        size === 'small'
          ? styles.small
          : size === 'medium'
          ? styles.medium
          : styles.large,
      ]}
      onPress={pickImage}
      disabled={disabled}>
      {image && (
        <Image
          source={
            uri === 'user'
              ? require('../assets/user.png')
              : uri === 'user2'
              ? require('../assets/user-2.jpg')
              : { uri: image }
          }
          style={styles.imagePrevious}
          // onPress={pickImage}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageProfile: {
    backgroundColor: '#ffffff',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#00000050',
  },

  imagePrevious: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },

  large: {
    width: 90,
    height: 90,
  },

  medium: {
    width: 100,
    height: 100,
  },

  small: {
    width: 50,
    height: 50,
  },
});
