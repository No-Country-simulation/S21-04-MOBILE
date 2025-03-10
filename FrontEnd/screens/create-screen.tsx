import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => (
  <View style={styles.header}>
    <Ionicons name="arrow-back" size={24} color="white" />
    <Text style={styles.headerTitle}>Publicación</Text>
    <Ionicons name="settings" size={24} color="white" />
  </View>
);

const MediaPicker = () => (
  <View style={styles.mediaPicker}>
    <TouchableOpacity style={styles.mediaButton}>
      <Ionicons name="camera" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

const InputField = () => (
  <TextInput style={styles.input} placeholder="Escribe aquí.." placeholderTextColor="#aaa" />
);

const OptionsList = () => (
  <View>
    <TouchableOpacity style={styles.option}>
      <Text style={styles.optionText}>Agrega Etiquetas</Text>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.option}>
      <Text style={styles.optionText}>Agrega Ubicación</Text>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
  </View>
);

const FooterButtons = () => (
  <View style={styles.footer}>
    <TouchableOpacity style={[styles.button, styles.publishButton]}>
      <Text style={styles.buttonText}>Publicar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.cancelButton]}>
      <Text style={styles.buttonText}>Cancelar</Text>
    </TouchableOpacity>
  </View>
);

const NewPostScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.label}>Agrega un video o una foto a tu publicación:</Text>
      <MediaPicker />
      <Text style={styles.label}>Agrega un pie de foto o video:</Text>
      <InputField />
      <OptionsList />
      <FooterButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  mediaPicker: { backgroundColor: "#333", height: 150, justifyContent: "center", alignItems: "center", borderRadius: 10, marginBottom: 10 },
  mediaButton: { backgroundColor: "#e91e63", padding: 20, borderRadius: 50 },
  input: { backgroundColor: "#333", color: "white", padding: 10, borderRadius: 5, marginBottom: 10 },
  option: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  optionText: { color: "white", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  publishButton: { backgroundColor: "#e91e63" },
  cancelButton: { borderWidth: 1, borderColor: "#e91e63" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  label: { color: "white", marginBottom: 5 }
});

export default NewPostScreen;
