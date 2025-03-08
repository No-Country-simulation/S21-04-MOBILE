import { TextInput, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBarComponent() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between"  }}>
      <View style={styles.searchBar}>
        <TextInput style={styles.textInput} />
        <FontAwesome
          name="search"
          size={16}
          color="white"
          style={styles.icon}
        />
      </View>

      <FontAwesome name="filter" size={16} color="white" style={{  }} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'relative',
    width: "90%"
  },
  textInput: {
    paddingBottom: 6,
    paddingLeft: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 5,
  },
});
