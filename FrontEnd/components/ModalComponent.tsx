import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import Clip from '../interfaces/clip-interface';
import ClipFullScreen from './ClipFullScreen';

export default function ModalComponent({
  visible,
  closeModal,
  selectedClip,
}: {
  visible: boolean;
  closeModal: () => void;
  selectedClip: Clip;
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={styles.modalContainer}>
        {selectedClip && (
          <ClipFullScreen fullScreen={visible} {...selectedClip} />
        )}
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
  },
});
