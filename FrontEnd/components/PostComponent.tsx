import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import COMMENTS from '../hardcode/comments';
import { PROFILE } from '../hardcode/profile';
import Post from '../interfaces/post-interface';
import { GlobalStore, useStore } from '../store';
import CommentsModal from './CommentModal';
import VideoComponent from './VideoComponent';

const PostComponent = ({
  id,
  userId,
  name,
  time,
  imageURL,
  content,
  hashtags,
  mediaUrl
}: Post) => {
  const { following, addFollowing, likedPosts, toggleLikePost } = useStore(s => s as GlobalStore);
  const isLiked = likedPosts.includes(String(id));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isFollowingUser, setFollowingUser] = useState(following.includes(String(userId)));

  React.useEffect(() => {
    setFollowingUser(following.includes(String(userId)))
  }, [userId, following]);

  const handleFollowingUser = () => {
    addFollowing(String(userId))
    setFollowingUser(!isFollowingUser)
  };

  return (
    <>
      <CommentsModal
        id={id}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        comments={COMMENTS}
      />
      <View style={styles.container}>
        {/* @ts-ignore */}
        <View style={styles.header}>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { userId })}>
            <Image
              source={
                imageURL === 'user'
                  ? require('../assets/user.png')
                  : imageURL === 'user2'
                    ? require('../assets/user-2.jpg')
                    : { uri: imageURL }
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            {/* @ts-ignore */}
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          {!isFollowingUser && (
            /* @ts-ignore */
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => handleFollowingUser()}>
              <Text style={styles.followText}>+ Seguir</Text>
            </TouchableOpacity>
          )}
          <FontAwesome name="ellipsis-v" size={14} color="#fff" />
        </View>

        <Text style={styles.postText}>
          {content} <Text style={styles.mention}>@usuario</Text>{' '}
          <Text style={styles.hashtag}>{hashtags.join(" ")}</Text>
        </Text>

        {mediaUrl && (
          <View style={{ height: 150, width: "100%", marginBottom: 10 }}>
            <VideoComponent videoSource={mediaUrl} />
          </View>
        )}

        {/* @ts-ignore */}
        <View style={styles.footer}>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => toggleLikePost(String(id))}>
            {isLiked ? (
              <FontAwesome name="heart" size={16} color="#d7044e" />
            ) : (
              <FontAwesome name="heart-o" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="comment-o" size={16} color="#fff" />
          </TouchableOpacity>
          <FontAwesome name="paper-plane-o" size={16} color="#fff" />
        </View>
      </View>
    </>
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
