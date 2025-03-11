import { View, Text, TextInput, StyleSheet } from "react-native";

const InputComponent = ({ label, multiline, placeholder, defaultValue }: { defaultValue: string, label: string; multiline?: boolean, placeholder: string }) => (
  <View style={styles.containerInput}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={multiline ? styles.textArea : styles.textInput}
      placeholder={placeholder}
      multiline={multiline}
      defaultValue={defaultValue}
    />
  </View>
);

const styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },

  textArea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: 'transparent',
  },
})

export default InputComponent;