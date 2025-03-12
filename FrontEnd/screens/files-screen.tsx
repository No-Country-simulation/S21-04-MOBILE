import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import GradientComponent from '../components/GradientProfile';

const ideas = [
  { id: '1', date: '04/24', title: 'intro electrónica fo' },
  { id: '2', date: '11/24', title: 'de camino al parqu' },
  { id: '3', date: '07/24', title: 'sin título' },
  { id: '4', date: '12/23', title: 'base para el tema d' },
];

const IdeasScreen = () => {
  const [menu, setMenu] = React.useState('list');

  const handleMenu = (m: string) => setMenu(m);

  if (menu === 'list') return <ListIdeas handleMenu={handleMenu} />;

  return <CreateOrEditIdea handleMenu={handleMenu} />;
};

const ListIdeas = ({ handleMenu }: { handleMenu: (m: string) => void }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: 50, width: '100%' }}>
          <GradientComponent height={150} />
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="transparent" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tus Ideas</Text>
            <TouchableOpacity>
              <Ionicons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.newIdeaButton}
            onPress={() => handleMenu('crear')}>
            <Text style={styles.newIdeaText}>Idea Nueva</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            <Text style={{ fontWeight: 'bold' }}>Tus ideas: </Text>
            Toca sobre la que quieres seguir trabajando
          </Text>

          <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ideaItem}>
                <Ionicons name="musical-note" size={20} color="white" />
                <Text style={styles.ideaDate}>{item.date}</Text>
                <Text style={styles.ideaTitle}>{item.title}</Text>
                <TouchableOpacity>
                  <Ionicons name="create" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CreateOrEditIdea = ({
  handleMenu,
}: {
  handleMenu: (m: string) => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [recording, setRecording] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioDuration, setAudioDuration] = useState('00:00');

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {
      console.error('Error al iniciar grabación:', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setRecording(null);

    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    // Asegura que el sonido se reproduzca con el volumen máximo
    await sound.setVolumeAsync(1.0);

    setAudio(sound);
    setAudioDuration(getDurationFormatted(status.durationMillis));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: 50, width: '100%' }}>
          <GradientComponent height={150} />
        </View>
        <View style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Idea Nueva</Text>
            <TouchableOpacity>
              <Ionicons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <Text style={styles.label}>
            Tu Idea a recordar{' '}
            <Text style={styles.subLabel}>(Sólo para ti)</Text>:
          </Text>
          <Text style={styles.fieldTitle}>Título:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />

          {/* Selección de ícono */}
          <TouchableOpacity style={styles.iconSelector}>
            <Text style={styles.iconSelectorText}>Selecciona un ícono</Text>
          </TouchableOpacity>

          {/* Descripción */}
          <Text style={styles.descriptionText}>
            Escribe lo que quieras recordar, podrás luego seguir editando en Tu
            lista de ideas.
          </Text>
          <TextInput
            style={styles.inputLarge}
            placeholder="Escribe aquí.."
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Grabación de audio */}
          <Text style={styles.audioLabel}>
            Graba audio sobre tu idea musical
          </Text>
          <View style={styles.audioRecorder}>
            <TouchableOpacity
              style={recording ? styles.micButtonActive : styles.micButton}
              onPress={recording ? stopRecording : startRecording}>
              <Ionicons name="mic" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.audioLine} />
            <Text style={styles.audioTime}>{audioDuration}</Text>
          </View>

          {/* Botón de reproducción */}
          {audio && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => audio.replayAsync()}>
              <Ionicons name="play" size={20} color="white" />
              <Text style={styles.playButtonText}>Reproducir</Text>
            </TouchableOpacity>
          )}

          {/* Referencia */}
          <Text style={styles.referenceLabel}>
            Registra una referencia, una inspiración, un recordatorio...
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Anota (un artista, una canción..)"
            placeholderTextColor="#888"
            value={reference}
            onChangeText={setReference}
          />

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222222',
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  newIdeaButton: {
    backgroundColor: '#FF007F',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  newIdeaText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    marginBottom: 10,
  },
  ideaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  ideaDate: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    width: 50,
  },
  ideaTitle: {
    color: 'white',
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  subLabel: {
    fontWeight: 'normal',
    color: '#bbb',
  },
  fieldTitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  iconSelector: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  iconSelectorText: {
    color: 'white',
    textAlign: 'center',
  },
  descriptionText: {
    color: 'white',
    marginTop: 15,
  },
  inputLarge: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    height: 80,
    textAlignVertical: 'top',
  },
  audioLabel: {
    color: 'white',
    marginTop: 20,
  },
  audioRecorder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  micButton: {
    backgroundColor: '#FF007F',
    padding: 10,
    borderRadius: 50,
  },
  audioLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FF007F',
    marginHorizontal: 10,
  },
  audioTime: {
    color: 'white',
  },
  referenceLabel: {
    color: 'white',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#FF007F',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#FF007F',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
  },

  micButtonActive: {
    backgroundColor: '#FF4747',
    padding: 10,
    borderRadius: 50,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default IdeasScreen;
