import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useState } from "react";
import VideoComponent from "./VideoComponent";

export default function MenuComponent () {
  const [menu, setMenu] = useState("publicaciones");
  
  const handleMenu = (name: string) => setMenu(name);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => handleMenu("publicaciones")} style={[ styles.tab, menu === "publicaciones" && styles.selected]}>
          <Text style={[styles.textTab, menu === "publicaciones" && styles.textSelected]}>Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenu("sample")} style={[ styles.tab, menu === "sample" && styles.selected]}>
          <Text style={[styles.textTab, menu === "sample" && styles.textSelected]}>Sample</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenu("info")} style={[ styles.tab, menu === "info" && styles.selected]}>
          <Text style={[styles.textTab, menu === "info" && styles.textSelected]}>Info</Text>
        </TouchableOpacity>
      </View>
      <View>
          <View style={{ width: 120, height: 200, borderWidth: 2, borderRadius: 10 }}>
            <VideoComponent />
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },

  tabs: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 12
  },
  
  tab: {
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  
  selected: {
    // backgroundColor: "black"
    borderBottomWidth: 2,
    borderBottomColor: "#d7044e"
  },

  textTab: {
    color: "white"
  },
  
  textSelected: {
    color: "white",
    fontWeight: 600
  },
})