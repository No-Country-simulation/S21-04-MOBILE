import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Provider } from 'react-native-paper';

// Components
import ClipsListComponent from '../components/ClipsListComponent';
import PostComponent from '../components/PostComponent';
import ModalComponent from '../components/ModalComponent';

// Hardcode
import { CLIPS } from "../hardcode/clips";
import { POSTS } from "../hardcode/posts";

enum Menu {
  "tendencias",
  "seguidos"
}

interface MenuProps {
  menu: Menu,
  handleMenu: (s: Menu) => void,
  handleSelectVideo: (s: string) => void
}

export default function HomeScreen() {
  const [menu, setMenu] = React.useState<Menu>(Menu["tendencias"]);
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  const handleMenu = (s: Menu) => setMenu(s);
  const handleSelectVideo = (video: string) => setSelectedVideo(video);

  return (
    <Provider>
      {selectedVideo && (
        <ModalComponent
          visible={!!selectedVideo}
          closeModal={() => handleSelectVideo('')}
          selectedVideo={selectedVideo}
        />
      )}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Header />
            <MenuContainer menu={menu} handleMenu={handleMenu} handleSelectVideo={handleSelectVideo} />
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
  onSelectVideo,
}: {
  onSelectVideo: (video: string) => void;
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
    <ClipsListComponent CLIPS={CLIPS} onSelectVideo={onSelectVideo} />
  </>
);

// Section Publicaciones in Tab Tendencias
const Publicaciones = () => (
  <View style={{ marginVertical: 15 }}>
    <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
      Últimas Publicaciones
    </Text>
    {POSTS.map((post) => (
      <PostComponent {...post} />
    ))}
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
const MenuComponent = ({ menu, handleSelectVideo }: { menu: Menu, handleSelectVideo: (s: string) => void }) => {
  if (menu === Menu["seguidos"]) return null

  return (
    <>
      <Clips onSelectVideo={handleSelectVideo} />
      <Publicaciones />
    </>
  )
}

// Menu container
const MenuContainer = (
  { menu, handleMenu, handleSelectVideo }: MenuProps) => {
  return (
    <>
      <Tabs menu={menu} handleMenu={handleMenu} />
      <MenuComponent handleSelectVideo={handleSelectVideo} menu={menu} />
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