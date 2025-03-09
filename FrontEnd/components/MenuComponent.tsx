import { View, TouchableOpacity, StyleSheet, Text, FlatList } from "react-native";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import PostComponent from "./PostComponent";
import Clip from "../interfaces/clip-interface";
import PreviewClipComponent from "./PreviewClipComponent";

interface PostProps {
  id: number;
  userId?: number;
  name: string;
  time: string;
  imageURL: string;
  content: string;
  hashtags: string[];
  isFollowing?: boolean;
}

export default function MenuComponent({ handleSelectClip, POSTS, CLIPS }: { handleSelectClip: (c: Clip) => void, POSTS: PostProps[], CLIPS: any }) {
  const [menu, setMenu] = useState("publicaciones");

  const handleMenu = (name: string) => setMenu(name);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => handleMenu("publicaciones")} style={[styles.tab, menu === "publicaciones" && styles.selected]}>
          <Text style={[styles.textTab, menu === "publicaciones" && styles.textSelected]}>Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenu("sample")} style={[styles.tab, menu === "sample" && styles.selected]}>
          <Text style={[styles.textTab, menu === "sample" && styles.textSelected]}>Sample</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          menu === "publicaciones" ?
            <Posts POSTS={POSTS} />
            : <Clips handleSelectClip={handleSelectClip} CLIPS={CLIPS} />
        }
      </View>
    </View>
  )
};

const Posts = ({ POSTS }: { POSTS: PostProps[] }) => {
  return (
    <View style={{ padding: 20 }}>
      {
        POSTS.length ?
        POSTS.map((post: PostProps) => (
          <PostComponent
            {...post}
          />
        )) : <Text style={{ textAlign: "center", color: "white" }}>No hay publicaciones</Text>
      }
    </View>
  )
}

const Clips = ({ handleSelectClip, CLIPS }: { handleSelectClip: (c: Clip) => void, CLIPS: Clip[] }) => {
  if(!CLIPS.length) return <Text style={{ textAlign: "center", color: "white", marginVertical: 10 }}>No hay clips</Text>

  return (
    // @ts-ignore
    <FlatList keyExtractor={(_: Clip, index: number) => index}
      data={CLIPS}
      style={{ padding: 10, gap: 4 }}
      columnWrapperStyle={{ marginBottom: 6 }}
      numColumns={3}
      renderItem={({ item }: { item: Clip }) => (
        <PreviewClipComponent
          item={item}
          onSelectClip={handleSelectClip}
          detailUser={false}
        />
      )}
    />
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