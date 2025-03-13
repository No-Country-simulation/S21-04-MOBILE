import React from 'react';
import {
  Image, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList
} from 'react-native';
import { Provider } from 'react-native-paper';
// import { useStore } from 'zustand';

// Components
import ClipsListComponent from '../components/ClipsListComponent';
import ModalComponent from '../components/ModalComponent';
import PostComponent from '../components/PostComponent';

// Hardcode
import { POSTS } from "../hardcode/posts";

// Interfaces
import Clip from '../interfaces/clip-interface';
import Post from '../interfaces/post-interface';
import { GlobalStore, useStore } from '../store';

enum Menu {
  "tendencias",
  "seguidos"
}

interface MenuProps {
  menu: Menu,
  handleMenu: (s: Menu) => void,
  handleSelectClip: (s: Clip) => void
}

export default function HomeScreen() {
  const [menu, setMenu] = React.useState<Menu>(Menu["tendencias"]);
  const [selectedClip, setSelectedClip] = React.useState<Clip | null>();

  const handleMenu = (s: Menu) => setMenu(s);
  const handleSelectClip = (c: Clip | null) => setSelectedClip(c);

  return (
    <Provider>
      {selectedClip && (
        <ModalComponent
          visible={!!selectedClip}
          closeModal={() => handleSelectClip(null)}
          selectedClip={selectedClip}
        />
      )}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Header />
            <MenuContainer menu={menu} handleMenu={handleMenu} handleSelectClip={handleSelectClip} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

// Logo
const Header = () => (
  <View style={{ marginVertical: 10 }}>
    <Image
      source={require('../assets/logo.png')}
      style={{ width: 160, height: 70 }}
    />
  </View>
)

// Section Clips in Tab Tendencias
const Clips = ({
  onSelectClip,
  clips
}: {
  onSelectClip: (clip: Clip) => void;
  clips: Clip[]
}) => (
  <>
    <Text
      style={{
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginVertical: 10,
      }}>
      Clips para ti
    </Text>
    <ClipsListComponent clips={clips} onSelectClip={onSelectClip} />
  </>
);

// Section Publicaciones in Tab Tendencias
const Publicaciones = ({ posts }: { posts: Post[] }) => (
  <View style={{ marginVertical: 15 }}>
    <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', marginBottom: 10 }}>
      Últimas Publicaciones
    </Text>
    <FlatList
      data={posts}
      renderItem={({ item }: { item: Post }) => <PostComponent {...item} />}
      keyExtractor={(_: Post, index: number) => String(index)}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

// Tab Home (Tendencia, Seguidos)
const Tabs = ({ menu, handleMenu }: { menu: Menu, handleMenu: (s: Menu) => void }) => (
  <View style={styles.tabs}>
    <TouchableOpacity
      onPress={() => handleMenu(Menu['tendencias'])}
      style={[styles.tab, menu === Menu['tendencias'] && styles.selected]}>
      <Text
        style={[
          styles.textTab,
          menu === Menu['tendencias'] && styles.textSelected,
        ]}>
        Tendencias
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleMenu(Menu['seguidos'])}
      style={[styles.tab, menu === Menu['seguidos'] && styles.selected]}>
      <Text
        style={[
          styles.textTab,
          menu === Menu['seguidos'] && styles.textSelected,
        ]}>
        Siguiendo
      </Text>
    </TouchableOpacity>
  </View>
);

// Menu component see 
const MenuComponent = ({ menu, handleSelectClip }: { menu: Menu, handleSelectClip: (s: Clip) => void }) => {
  // @ts-ignore
  const { clipsFeatured, clipsFollowing, postsFollowing, postsFeatured } = useStore((state: GlobalStore) => state);
  if (menu === Menu["seguidos"]) return (
    <>
      <Clips clips={clipsFollowing} onSelectClip={handleSelectClip} />
      <Publicaciones posts={postsFollowing} />
    </>
  )

  return (
    <>
      <Clips clips={clipsFeatured} onSelectClip={handleSelectClip} />
      <Publicaciones posts={postsFeatured} />
    </>
  )
}

// Menu container
const MenuContainer = (
  { menu, handleMenu, handleSelectClip }: MenuProps) => {
  return (
    <>
      <Tabs menu={menu} handleMenu={handleMenu} />
      <MenuComponent handleSelectClip={handleSelectClip} menu={menu} />
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 20,
    backgroundColor: '#222222',
    flex: 1,
  },
  scrollView: {},
  container: {
    paddingHorizontal: 15,
  },
  tabs: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 12,
    marginBottom: 10,
  },
  tab: {
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: '#d7044e',
  },
  textTab: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  textSelected: {
    color: 'white',
    fontWeight: '600',
  },
});