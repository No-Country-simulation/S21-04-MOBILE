import TagComponent from "./TagComponent";
import { View, StyleSheet } from "react-native";
import PROFILE from "../hardcode/profile";

const tags = [
  { label: "Guitarrista", selected: true },
  { label: "Baterista", selected: true },
  { label: "Bajista", selected: true },
  { label: "DJ", selected: false },
  { label: "Tecladista", selected: false },
  { label: "Beatmaker", selected: false },
  { label: "Vocalista", selected: false },
  { label: "Compositor/a", selected: false },
  { label: "Violinista", selected: false },
  { label: "Percusionista", selected: false },
  { label: "Director/a de orquesta", selected: false },
  { label: "Productor/a", selected: false },
  { label: "Trompetista", selected: false },
  { label: "Flautista", selected: false },
  { label: "Saxofonista", selected: false },
  { label: "Otro", selected: false },
];


export default function Tags () {
  return (
    <View style={styles.tags}>
      {tags.map((tag, index) => (
        <TagComponent label={tag.label} key={tag.label} selected={!!PROFILE.tags.filter(x => x === tag.label)[0]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 4,
  }
})