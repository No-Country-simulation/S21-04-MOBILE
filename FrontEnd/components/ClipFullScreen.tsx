import { Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import VideoComponent from './VideoComponent';
import Clip from '../interfaces/clip-interface';
import COMMENTS from '../hardcode/comments';
import CommentsModal from './CommentModal';
import { useState } from 'react';

interface ClipFullScreenProps extends Clip {
    fullScreen: boolean;
}

export default function ClipFullScreen({
    videoURL,
    name,
    username,
    content,
    tags,
    fullScreen,
}: ClipFullScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
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
                        {JSON.stringify(tags)}
                    </Text>
                </View>
                <View style={{ position: "absolute", bottom: 150, gap: 16, right: 0, paddingHorizontal: 15 }}>
                    <FontAwesome name="heart-o" size={26} color="#fff" />
                    <FontAwesome name="comment-o" size={26} color="#fff" />
                    <FontAwesome name="paper-plane-o" size={26} color="#fff" />
                </View>
            </View>
        </>
    );
}