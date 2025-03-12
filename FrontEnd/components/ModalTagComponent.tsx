import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import {
    Modal, ScrollView, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';

const TAGS = [
    'Rock', 'Electrónica', 'Folk', 'HipHop', 'Rap', 'Indie', 'LoFi', 'Afro', 'Blues',
    'World Music', 'Clásica', 'Instrumental', 'Pop', 'Jazz', 'Hyperpop', 'Folklore',
    'Funki', 'Eventos', 'Cumbia', 'Cuarteto', 'Fiestas', 'Metal', 'Tecno', 'Beat'
];

interface NewPost {
    mediaURL: ImagePicker.ImagePickerAsset | null;
    location: string;
    content: string;
    tags: string[];
}

const TagSelectionModal = ({ visible, onClose, newPost, setNewPost }: {
    visible: boolean;
    onClose: () => void;
    newPost: NewPost;
    setNewPost: React.Dispatch<React.SetStateAction<NewPost>>;
}) => {
    const [localTags, setLocalTags] = useState(newPost.tags || []);

    const toggleTag = (tag: string) => {
        if (localTags.includes(tag)) {
            setLocalTags(localTags.filter(t => t !== tag));
        } else if (localTags.length < 5) {
            setLocalTags([...localTags, tag]);
        }
    };

    const handleAccept = () => {
        setNewPost({ ...newPost, tags: localTags });
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Selecciona Etiquetas (Hasta 5):</Text>
                    <ScrollView contentContainerStyle={styles.tagContainer}>
                        {TAGS.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={[styles.tag, localTags.includes(tag) && styles.selectedTag]}
                                onPress={() => toggleTag(tag)}
                            >
                                <Text style={styles.tagText}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                        <Text style={styles.acceptButtonText}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    tag: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 5,
    },
    selectedTag: {
        backgroundColor: '#e91e63',
    },
    tagText: {
        color: 'white',
        fontSize: 14,
    },
    acceptButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 15,
    },
    acceptButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TagSelectionModal;
