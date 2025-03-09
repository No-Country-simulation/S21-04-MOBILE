import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import USERS from '../hardcode/users';
import MenuComponent from '../components/MenuComponent';
import GradientComponent from '../components/GradientComponent';
import Clip from '../interfaces/clip-interface';
import ModalComponent from '../components/ModalComponent';
import { Provider } from 'react-native-paper';

export default function DetailProfileScreen({ route }: { route: any }) {
  const { userId } = route.params;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedClip, setSelectedClip] = React.useState<Clip | null>();

  const handleSelectClip = (c: Clip | null) => setSelectedClip(c);

  useEffect(() => {
    const user = USERS.filter((x) => x.id === userId)[0];
    if (user?.id) {
      setCurrentUser(user);
      console.log({ user });
    } else {
      alert('El usuario no existe');
    }
  }, [userId]);

  if (!currentUser) return null;

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        {selectedClip && (
          <ModalComponent
            visible={!!selectedClip}
            closeModal={() => handleSelectClip(null)}
            selectedClip={selectedClip}
          />
        )}
        <ScrollView style={styles.scrollView}>
          <GradientComponent />
          <View style={styles.header}>
            <ImagePickerComponent
              disabled={true}
              uri={currentUser.imageURL}
              size="large"
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Name name={currentUser.name} />
                <Username username={currentUser.username} />
              </View>
              <Location location={currentUser.location} />
            </View>
            <Bio bio={currentUser.bio} />
            <Tags tags={currentUser.tags} />
            <Text style={styles.follow}>
              {currentUser.followers} Seguidores • {currentUser.following}{' '}
              Siguiendo
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followText}>
                  {currentUser.isFollowing ? '- Dejar de seguir' : '+ Seguir'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => null}>
                <FontAwesome name="comment-o" size={16} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => null}>
                <FontAwesome size={16} color="white" name="share" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.links}>
            <Text style={styles.titleLink}>También estoy en</Text>
            <View style={styles.containerLinks}>
              {[
                { label: 'Spotify', selected: false },
                { label: 'Youtube', selected: false },
                { label: 'Instagram', selected: false },
              ].map((tag, index) => (
                <TagComponent
                  selected={tag.selected}
                  label={tag.label}
                  key={index}
                />
              ))}
            </View>
          </View>
          <MenuComponent handleSelectClip={handleSelectClip} POSTS={currentUser.posts} CLIPS={currentUser.clips} />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

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

const TagComponent = ({
  selected,
  label,
  // size = 'medium',
  style,
  icon,
  iconSize,
  iconColor,
}: any) => (
  <TouchableOpacity activeOpacity={0.7}>
    <View style={[styles.tag, selected && styles.tagSelected, style]}>
      {icon && <Entypo name={icon} size={iconSize} color={iconColor} />}
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const Bio = ({ bio }: { bio: string }) => (
  <Text style={styles.bio}>´{bio}</Text>
);

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

  gradient: {
    width: '100%',
    position: 'absolute',
    height: 300,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

  tag: {
    borderRadius: 20,
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  tagSelected: {
    backgroundColor: '#3498db',
  },

  tagText: {
    color: '#333',
    fontSize: 12,
  },

  tagTextSelected: {
    color: '#fff',
  },

  followButton: {
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  followText: {
    color: '#fff',
    fontSize: 12,
  },
});