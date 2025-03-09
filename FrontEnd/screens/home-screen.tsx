import React from 'react';
import {
  Image, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Provider } from 'react-native-paper';

// Components
import ClipsListComponent from '../components/ClipsListComponent';
import ModalComponent from '../components/ModalComponent';
import PostComponent from '../components/PostComponent';

// Hardcode
import { POSTS } from "../hardcode/posts";

// Interfaces
import Clip from '../interfaces/clip-interface';

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
}: {
  onSelectClip: (clip: Clip) => void;
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
    <ClipsListComponent onSelectClip={onSelectClip} />
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
const MenuComponent = ({ menu, handleSelectClip }: { menu: Menu, handleSelectClip: (s: Clip) => void }) => {
  if (menu === Menu["seguidos"]) return null

  return (
    <>
      <Clips onSelectClip={handleSelectClip} />
      <Publicaciones />
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