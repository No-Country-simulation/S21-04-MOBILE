import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
// import { Modal } from 'react-native-paper';

interface NewPost {
  mediaURL: ImagePicker.ImagePickerAsset | null;
  location: string;
  content: string;
  tags: string[];
}

const ModalCancel = ({
  visible,
  onClose,
  newPost,
  setNewPost,
}: {
  visible: boolean;
  onClose: () => void;
  newPost: NewPost;
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>;
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>¿Seguro que deseas cancelar esta publicación?</Text>

          <TouchableOpacity onPress={() => null} style={styles.publishButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Seguir editando</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  publishButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ModalCancel;
