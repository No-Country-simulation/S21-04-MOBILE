import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import VideoComponent from './VideoComponent';
import Clip from '../interfaces/clip-interface';
import COMMENTS from '../hardcode/comments';
import CommentsModal from './CommentModal';
import React, { useState } from 'react';
import { GlobalStore, useStore } from '../store';

interface ClipFullScreenProps extends Clip {
    fullScreen: boolean;
}

export default function ClipFullScreen({
    id,
    videoURL,
    name,
    username,
    content,
    tags,
    fullScreen,
}: ClipFullScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const { likedClips, toggleLikeClip } = useStore(s => s as GlobalStore);
    const isLiked = likedClips.includes(String(id));

    return (
        <>
            <CommentsModal visible={modalVisible} onDismiss={() => setModalVisible(false)} comments={COMMENTS} />
            <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                <VideoComponent videoSource={videoURL} fullScreen={fullScreen} />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        gap: 8,
                        padding: 20,
                        height: 140
                    }}>
                    <Text style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>
                        {name}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                        {"@" + username}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>
                        {content}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>
                        {tags?.join(" ")}
                    </Text>
                </View>
                <View style={{ position: "absolute", bottom: 150, gap: 20, right: 0, paddingHorizontal: 15 }}>

                    {/* @ts-ignore */}
                    <TouchableOpacity onPress={() => toggleLikeClip(String(id))}>
                        {
                            isLiked ?
                                <FontAwesome name="heart" size={26} color="#d7044e" /> :
                                <FontAwesome name="heart-o" size={26} color="#fff" />
                        }
                    </TouchableOpacity>
                    {/* @ts-ignore */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <FontAwesome name="comment-o" size={26} color="#fff" />
                    </TouchableOpacity>
                    <FontAwesome name="paper-plane-o" size={26} color="#fff" />
                </View>
            </View>
        </>
    );
}