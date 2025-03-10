import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import InputComponent from '../components/InputComponent';
import TagsComponent from "../components/TagsComponent";
import PROFILE from '../hardcode/profile';

export default function EditProfile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled">
            <View style={{ margin: 20 }}></View>
            <ImagePickerComponent uri={PROFILE.imageURL} />

            <InputComponent
              label="Nombre"
              placeholder="Ingrese su nombre"
              defaultValue={PROFILE.name}
            />
            <InputComponent
              label="Nombre de usuario"
              placeholder="Ingrese su usuario"
              defaultValue={PROFILE.username}
            />
            <InputComponent
              label="Ubicación"
              placeholder="Ingrese ciudad, provincia y país"
              defaultValue={PROFILE.location}
            />
            <InputComponent
              label="Sitio web"
              placeholder="URL del sitio web"
              defaultValue={
                PROFILE.links.filter(x => x.name === "Sitio Web")[0]?.url ?
                  PROFILE.links.filter(x => x.name === "Sitio Web")[0].url
                  : ""
              }
            />
            <InputComponent
              label="Spotify"
              placeholder="Ingrese usuario de spotify"
              defaultValue={
                PROFILE.links.filter(x => x.name === "Spotify")[0]?.url ?
                  PROFILE.links.filter(x => x.name === "Spotify")[0].url
                  : ""
              }
            />

            <InputComponent
              label="Youtube"
              placeholder="Ingrese usuario de youtube"
              defaultValue={
                PROFILE.links.filter(x => x.name === "Youtube")[0]?.url ?
                  PROFILE.links.filter(x => x.name === "Youtube")[0].url
                  : ""
              }
            />
            <InputComponent
              label="Instagram"
              placeholder="Ingrese usuario de instagram"
              defaultValue={
                PROFILE.links.filter(x => x.name === "Instagram")[0]?.url ?
                  PROFILE.links.filter(x => x.name === "Instagram")[0].url
                  : ""
              }
            />
            <InputComponent
              label="Tiktok"
              placeholder="Ingrese usuario de tiktok"
              defaultValue={
                PROFILE.links.filter(x => x.name === "Tiktok")[0]?.url ?
                  PROFILE.links.filter(x => x.name === "Tiktok")[0].url
                  : ""
              }
            />
            <InputComponent
              label="Bio"
              multiline={true}
              placeholder="Hablale a los demás usuarios sobre vos"
              defaultValue={PROFILE.bio}
            />
            <View style={styles.containerInput}>
              <Text style={styles.label}>Tags</Text>
              <TagsComponent />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },

  containerInput: {
    padding: 10,
    gap: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
