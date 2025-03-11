import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList, SafeAreaView,
  ScrollView, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View
} from 'react-native';
import { Provider } from 'react-native-paper';
import ClipsListComponent from '../components/ClipsListComponent';
import GenreCard from '../components/GenreCard';
import ModalComponent from '../components/ModalComponent';
import MusicianCard from '../components/MusicianCard';
import SearchBarComponent from '../components/SearchBarComponent';
import USERS from '../hardcode/users';
import Clip from '../interfaces/clip-interface';

export default function SearchScreen() {
  const [selectedClip, setSelectedClip] = React.useState<Clip | null>();

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
          <Buscador />
          <UsuariosDestacados />
          <Generos />
          <UsuariosSugeridos />
          <ClipsTendencia onSelectClip={handleSelectClip} />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const Buscador = () => (
  <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
    <Title s={'Descubre artistas y música'} />
    <SearchBarComponent />
  </View>
);

const Title = ({ s, style }: { s: string; style?: StyleProp<TextStyle> }) => (
  <Text
    style={[
      {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginVertical: 10,
      },
      style,
    ]}>
    {s}
  </Text>
);

const UsuariosDestacados = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 10 }}>
      <Title s={'Usuarios destacados'} style={{ marginLeft: 20 }} />
      <FlatList
        data={USERS}
        renderItem={({ item }: { item: any }) => (
          // @ts-ignore
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { userId: item.id })}
            style={{
              width: 170,
              height: 250,
              borderRadius: 15,
              marginHorizontal: 4,
            }}>
            <MusicianCard {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => String(index)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: '#FC1768',
          height: 270,
          paddingHorizontal: 4,
        }}
      />
    </View>
  );
};

const genres = [
  { name: 'Electrónica', icon: 'wave-square' },
  { name: 'Metal', icon: 'hand-rock' },
  { name: 'Reggae', icon: 'tree' },
  { name: 'Folk', icon: 'guitar' },
  { name: 'DJ', icon: 'user' },
  { name: 'Blues', icon: 'saxophone' },
];

const Generos = () => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Title s={'Géneros'} style={{ marginLeft: 20 }} />
      <FlatList
        data={genres}
        horizontal={true}
        renderItem={({ item }) => (
          <GenreCard name={item.name} icon={item.icon} />
        )}
        keyExtractor={(item) => item.name}
        style={styles.genreList}
      />
      <FlatList
        data={genres}
        horizontal={true}
        renderItem={({ item }: { item: { name: string; icon: string } }) => (
          <GenreCard name={item.name} icon={item.icon} />
        )}
        keyExtractor={(item) => item.name}
        style={styles.genreList}
      />
    </View>
  );
};

const UsuariosSugeridos = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 10 }}>
      <Title
        s={'Usuarios que podrían interesarte'}
        style={{ marginLeft: 20 }}
      />
      <FlatList
        data={USERS.reverse()}
        renderItem={({ item }: { item: any }) => (
          // @ts-ignore
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { userId: item.id })}
            style={{
              width: 170,
              height: 250,
              borderRadius: 15,
              marginHorizontal: 4,
            }}>
            <MusicianCard {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => String(index)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: '#FC1768',
          height: 270,
          paddingHorizontal: 4,
        }}
      />
    </View>
  );
};

const ClipsTendencia = ({
  onSelectClip,
}: {
  onSelectClip: (c: Clip) => void;
}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Title
        s={'Clips que están marcando tendencia'}
        style={{ marginLeft: 20 }}
      />
      <Title s={'#Folk'} style={{ marginLeft: 20 }} />
      <ClipsListComponent onSelectClip={onSelectClip} />
      <Title s={'#Jazz'} style={{ marginLeft: 20 }} />
      <ClipsListComponent onSelectClip={onSelectClip} />
      <Title s={'#R&B'} style={{ marginLeft: 20 }} />
      <ClipsListComponent onSelectClip={onSelectClip} />
      {/* <Title s={'#Cover'} style={{ marginLeft: 20 }} />
      <ClipsListComponent onSelectClip={onSelectClip} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222222',
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
    gap: 6,
  },

  genreList: {
    paddingHorizontal: 10,
  },
});