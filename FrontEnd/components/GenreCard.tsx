import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface GenreCardProps {
  name: string;
  icon: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ name, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{name}</Text>
      <FontAwesome5 name={icon} size={16} color="white" style={{ alignSelf: "flex-end" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff007f",
    width: 110,
    // height: 50,
    margin: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GenreCard;
