import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { IconButton, Modal, Portal } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons"
import { GlobalStore, useStore } from '../store';

const CommentItem = ({ comment }: { comment: any }) => {
    const { likedComments, toggleLikeComment } = useStore(s => s as GlobalStore);
    const isLiked = likedComments.includes(String(comment.id));
    
    return (
        <View style={styles.commentItem}>
            <Image source={{ uri: comment.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
                <Text style={styles.username}>{comment.username}</Text>
                <Text style={styles.text}>{comment.text}</Text>
                <View style={styles.commentActions}>
                    <Text style={styles.timestamp}>Hace {comment.time}</Text>
                    {/*@ts-ignore */}
                    <TouchableOpacity>
                        <Text style={styles.action}>Responder</Text>
                    </TouchableOpacity>
                    <Text style={styles.likes}>{comment.likes} me gusta</Text>
                    {/*@ts-ignore */}
                    <TouchableOpacity onPress={() => toggleLikeComment(String(comment.id))} style={{ marginHorizontal: 4 }}>
                        {isLiked ? (
                            <FontAwesome name="heart" size={16} color="#d7044e" />
                        ) : (
                            <FontAwesome name="heart-o" size={16} color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const CommentInput = () => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#aaa"
        />
        <IconButton icon="send" size={20} iconColor="white" />
    </View>
);

const CommentsModal = ({
    visible,
    onDismiss,
    comments,
}: {
    visible: boolean;
    onDismiss: () => void;
    comments: any[];
}) => {
    return (
        // @ts-ignore
        <Portal style={{ position: 'relative' }}>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.title}>Comentarios</Text>
                    <IconButton
                        icon="close"
                        size={24}
                        iconColor="white"
                        onPress={onDismiss}
                    />
                </View>
                <FlatList
                    data={comments}
                    renderItem={({ item }) => <CommentItem comment={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
                <CommentInput />
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#121212',
        padding: 16,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    commentItem: { flexDirection: 'row', marginVertical: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    commentContent: { flex: 1, gap: 2 },
    username: { color: 'white', fontWeight: 'bold' },
    text: { color: 'white' },
    commentActions: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    timestamp: { color: 'gray', marginRight: 10 },
    action: { color: '#e91e63', marginRight: 10 },
    likes: { color: 'gray' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#e91e63',
        paddingHorizontal: 10,
    },
    input: { flex: 1, color: 'white', padding: 10 },
});

export default CommentsModal;