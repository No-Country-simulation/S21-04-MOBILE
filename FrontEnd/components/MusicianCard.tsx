import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStore, useStore } from '../store';

interface MusicianCardProps {
  id: number;
  imageURL: string;
  name: string;
  username: string;
  location: string;
  tags: string[];
}

const MusicianCard: React.FC<MusicianCardProps> = ({
  id,
  imageURL,
  username,
  location,
  tags,
}) => {
  const { following, addFollowing, removeFollowing } = useStore(s => s as GlobalStore);
  const [isFollowingUser, setFollowingUser] = useState(following.includes(String(id)));

  React.useEffect(() => {
    setFollowingUser(following.includes(String(id)))
  }, [id, following]);

  const handleFollowingUser = () => {
    addFollowing(String(id))
    setFollowingUser(!isFollowingUser)
  };

  const handleUnfollowingUser = () => {
    removeFollowing(String(id))
    setFollowingUser(!isFollowingUser)
  }

  return (
    <View style={styles.card}>
      <Image
        source={
          imageURL === 'user'
            ? require('../assets/user.png')
            : imageURL === 'user2'
              ? require('../assets/user-2.jpg')
              : { uri: imageURL }
        }
        style={styles.image}
      />
      <View style={styles.topContainer}>
        <FontAwesome5 name="map-marker-alt" size={10} color="white" />
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.username}>@{username}</Text>
        <FlatList
          data={tags}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{item}</Text>
            </View>
          )}
          keyExtractor={(_, index) => String(index)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.genreContainer}
        />
        {!isFollowingUser ? (
          /* @ts-ignore */
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => handleFollowingUser()}>
            <Text style={styles.followText}>+ Seguir</Text>
          </TouchableOpacity>
        ) : (
          /* @ts-ignore */
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => handleUnfollowingUser()}>
            <Text style={styles.followText}>- Dejar de seguir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  location: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    gap: 4,
    marginVertical: 5,
    maxWidth: '100%',
  },
  genreBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  genreText: {
    color: 'white',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  followText: {
    fontWeight: 'bold',
    color: '#ff007f',
  },
});

export default MusicianCard;