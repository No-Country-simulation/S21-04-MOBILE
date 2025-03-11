import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Provider } from 'react-native-paper';
import GradientComponent from "../components/GradientProfile";
import ImagePickerComponent from '../components/ImagePickerComponent';
import MenuComponent from '../components/MenuComponent';
import ModalComponent from '../components/ModalComponent';
import TagComponent from '../components/TagComponent';
import PROFILE from '../hardcode/profile';
import Clip from '../interfaces/clip-interface';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
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
          <GradientComponent />
          <Header />
          <Links />
          <MenuComponent handleSelectClip={handleSelectClip} POSTS={PROFILE.posts} CLIPS={PROFILE.clips} />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ImagePickerComponent disabled={true} uri={PROFILE.imageURL} size="large" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Name name={PROFILE.name} />
          <Username username={PROFILE.username} />
        </View>
        <Location location={PROFILE.location} />
      </View>
      <Bio bio={PROFILE.bio} />
      <Tags tags={PROFILE.tags} />
      <Text style={styles.follow}>
        {PROFILE.followers} Seguidores • {PROFILE.following} Siguiendo
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => null}>
          <FontAwesome size={16} color="white" name="share" />
        </TouchableOpacity>
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
          <Feather name="edit" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View >
  )
}

const Links = () => (
  <View style={styles.links}>
    <Text style={styles.titleLink}>También estoy en</Text>
    <View style={styles.containerLinks}>
      {[
        { label: 'Spotify', selected: false },
        { label: 'Youtube', selected: false },
        { label: 'Instagram', selected: false },
      ].map((tag, index) => (
        <TagComponent selected={tag.selected} label={tag.label} key={index} />
      ))}
    </View>
  </View>
);

const Name = ({ name }: { name: string }) => (
  <Text style={styles.name}>{name}</Text>
);

const Username = ({ username }: { username: string }) => (
  <Text style={styles.username}>@{username}</Text>
);

const Location = ({ location }: { location: string }) => (
  <TagComponent
    selected={false}
    label={location}
    icon="location-pin"
    iconColor={'black'}
    iconSize={16}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    }}
  />
);

const Bio = ({ bio }: { bio: string }) => <Text style={styles.bio}>{bio}</Text>;

const Tags = ({ tags }: { tags: string[] }) => (
  <View style={styles.tags}>
    {tags.map((tag, index) => (
      <TagComponent selected={false} label={tag} key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222222',
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
  },

  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  name: {
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
    marginTop: 5,
  },

  username: {
    color: 'white',
    fontSize: 14,
    fontWeight: 400,
  },

  bio: {
    color: 'white',
    fontWeight: 400,
    fontSize: 12,
    marginTop: 5,
  },

  tags: {
    width: '100%',
    marginTop: 10,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
  },

  follow: {
    color: 'white',
    fontWeight: 400,
    fontSize: 12,
    paddingTop: 5,
  },

  actions: {
    gap: 4,
    marginTop: 10,
    flexDirection: 'row',
  },

  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  links: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  titleLink: {
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
  },

  containerLinks: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
});
