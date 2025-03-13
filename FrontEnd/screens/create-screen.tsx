import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Provider } from 'react-native-paper';
import ModalCancel from '../components/ModalCancell';
import ModalSuccess from '../components/ModalSuccess';
import TagSelectionModal from '../components/ModalTagComponent';
import { uploadFile } from '../services/media';
import { createPostServices } from '../services/posts';

interface NewPost {
  mediaURL: ImagePicker.ImagePickerAsset | null;
  location: string;
  content: string;
  tags: string[];
}

const Header = () => (
  <View style={styles.header}>
    <Ionicons name="arrow-back" size={24} color="transparent" />
    <Text style={styles.headerTitle}>Publicación</Text>
    <Ionicons name="settings" size={24} color="white" />
  </View>
);

const VideoPreview = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer(uri, (player) => {
    player.pause();
  });

  React.useEffect(() => { }, [uri]);

  return (
    <VideoView
      style={{ width: '100%', height: '100%' }}
      contentFit="cover"
      player={player}
      nativeControls={false}
    />
  );
};

const MediaPicker = ({
  newPost,
  setNewPost,
}: {
  newPost: NewPost;
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>;
}) => {
  const handlePickMedia = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Se requieren permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setNewPost({ ...newPost, mediaURL: result.assets[0] });
    }
  };

  return (
    <View style={styles.mediaPicker}>
      <TouchableOpacity style={styles.mediaButton} onPress={handlePickMedia}>
        {newPost.mediaURL && !newPost.mediaURL.uri.endsWith('.mp4') ? (
          <Image
            source={{ uri: newPost.mediaURL.uri }}
            style={styles.mediaImage}
          />
        ) : newPost.mediaURL ? (
          <VideoPreview uri={newPost.mediaURL.uri} />
        ) : (
          <Image
            source={require('../assets/new-post.png')}
            style={styles.mediaImage}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const InputField = ({
  newPost,
  setNewPost,
  placeholder = 'Escribe aquí..',
  name,
}: {
  placeholder: string;
  newPost: NewPost;
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>;
  name: 'content' | 'location';
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    defaultValue={newPost[name]}
    onChangeText={(text) => setNewPost({ ...newPost, [name]: text })}
    placeholderTextColor="#aaa"
  />
);

const OptionsList = ({
  newPost,
  setNewPost,
  setModalVisible,
}: {
  newPost: NewPost;
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <View style={{ marginVertical: 6 }}>
    <TouchableOpacity
      style={styles.option}
      onPress={() => setModalVisible(true)}>
      {newPost.tags.length ? (
        <Text style={styles.optionText}>{JSON.stringify(newPost.tags)}</Text>
      ) : (
        <>
          <Text style={styles.optionText}>Agrega Etiquetas</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </>
      )}
    </TouchableOpacity>
    <InputField
      name="location"
      placeholder="Agregar ubicación"
      setNewPost={setNewPost}
      newPost={newPost}
    />
  </View>
);

const FooterButtons = ({
  setModalCancell,
  setModalSuccess
}: {
  setModalCancell: React.Dispatch<React.SetStateAction<boolean>>;
  setModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.button, styles.publishButton]} onPress={() => setModalSuccess(true)}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalCancell(true)}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
};

const NewPostScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCancell, setModalCancell] = useState(false);
  const [newPost, setNewPost] = useState<NewPost>({
    mediaURL: null,
    location: '',
    content: '',
    tags: [],
  });

  const handlePublish = async () => {
    if (newPost?.mediaURL?.uri) {
      const fileUrl = await uploadFile(newPost.mediaURL.uri); // Subir archivo a Firebase
      console.log({ fileUrl });
      if (fileUrl) {
        const response = await createPostServices({
          type: "sample",
          mediaURL: fileUrl,
          userId: 1,
          description: newPost.content
        })

        console.log({ response })

        alert("Clip creado con éxito")
      } else {
        alert("Ocurrió un error al subir archivo")
      }
    } else {
      const response = await createPostServices({
        type: "sample",
        mediaURL: "",
        userId: 1,
        description: newPost.content
      })

      alert("Publicación creada con éxito")
    }
  };

  return (
    <Provider>
      <ModalCancel
        visible={modalCancell}
        newPost={newPost}
        setNewPost={setNewPost}
        onClose={() => {
          setModalCancell(false); setNewPost({
            mediaURL: null,
            location: '',
            content: '',
            tags: [],
          })
        }}
      />
      <ModalSuccess
        visible={modalConfirm}
        onSubmit={handlePublish}
        onClose={() => setModalConfirm(false)}
      />
      <TagSelectionModal
        newPost={newPost}
        onClose={() => setModalVisible(false)}
        setNewPost={setNewPost}
        visible={modalVisible}
      />
      <View style={styles.container}>
        <Header />
        <View style={{ marginVertical: 6 }}>
          <Text style={styles.label}>
            Agrega un video o una foto a tu publicación:
          </Text>
          <MediaPicker newPost={newPost} setNewPost={setNewPost} />
        </View>
        <View style={{ marginVertical: 6 }}>
          <Text style={styles.label}>Agrega un pie de foto o video:</Text>
          <InputField
            newPost={newPost}
            setNewPost={setNewPost}
            name="content"
            placeholder="Escribe aquí..."
          />
        </View>
        <OptionsList
          newPost={newPost}
          setNewPost={setNewPost}
          setModalVisible={setModalVisible}
        />
        <FooterButtons setModalCancell={setModalCancell} setModalSuccess={setModalConfirm} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediaPicker: {
    backgroundColor: '#333',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  mediaButton: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
  },
  optionText: { color: 'white', fontSize: 16 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  publishButton: { backgroundColor: '#e91e63' },
  cancelButton: { borderWidth: 1, borderColor: '#e91e63' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  label: { color: 'white', marginBottom: 5 },
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
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: '#e91e63',
  },
  tagText: {
    color: 'white',
    fontSize: 14,
  },
  acceptButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPostScreen;
