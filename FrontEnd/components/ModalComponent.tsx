import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import VideoComponent from './VideoComponent';

export default function ModalComponent({
  visible,
  closeModal,
  selectedVideo,
}: {
  visible: boolean;
  closeModal: () => void;
  selectedVideo: string;
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeModal}
        contentContainerStyle={styles.modalContainer}>
        {selectedVideo && (
          <VideoComponent videoSource={selectedVideo} fullScreen />
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
