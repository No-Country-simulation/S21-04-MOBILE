import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PROFILE from '../hardcode/profile';
import { useNavigation } from '@react-navigation/native';

interface PostProps {
  userId: number;
  name: string;
  time: string;
  imageURL: string;
  content: string;
  hashtags: string[];
  isFollowing: boolean;
}

const PostComponent = ({
  userId,
  name,
  time,
  imageURL,
  isFollowing,
  content,
  hashtags,
}: PostProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { userId })}>
          <Image
            source={
              imageURL === 'user'
                ? require('../assets/user.png')
                : imageURL === 'user2'
                ? require('../assets/user-2.jpg')
                : PROFILE.imageURL
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>
            {isFollowing ? '- Dejar de seguir' : '+ Seguir'}
          </Text>
        </TouchableOpacity>
        <FontAwesome name="ellipsis-v" size={14} color="#fff" />
      </View>

      <Text style={styles.postText}>
        {content} <Text style={styles.mention}>@usuario</Text>{' '}
        <Text style={styles.hashtag}>{JSON.stringify(hashtags)}</Text>
      </Text>

      <View style={styles.footer}>
        <FontAwesome name="heart-o" size={16} color="#fff" />
        <FontAwesome name="comment-o" size={16} color="#fff" />
        <FontAwesome name="paper-plane-o" size={16} color="#fff" />
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  headerText: {
    flex: 1,
    marginLeft: 10,
  },

  username: {
    color: '#fff',
    fontWeight: 'bold',
  },

  time: {
    color: '#888',
    fontSize: 12,
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
  postText: {
    color: '#fff',
    marginBottom: 10,
  },
  mention: {
    color: '#1DA1F2',
  },
  hashtag: {
    color: '#A29BFE',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    width: '25%',
  },
};

export default PostComponent;
