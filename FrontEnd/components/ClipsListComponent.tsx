import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import VideoComponent from './VideoComponent';

import { Clip, CLIPS } from '../hardcode/clips';

export default function ClipsListComponent({
    onSelectClip,
}: {
    onSelectClip: (c: Clip) => void;
}) {
    return (
        <FlatList
            data={CLIPS}
            renderItem={({ item }: { item: Clip }) => (
                <TouchableOpacity
                    style={{
                        width: 110,
                        height: 160,
                        borderRadius: 5,
                        marginHorizontal: 4,
                        position: 'relative',
                    }}
                    onPress={() => onSelectClip(item)}>
                    <VideoComponent videoSource={item.videoURL} />
                    <View
                        style={{
                            position: 'absolute',
                            gap: 5,
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            source={{ uri: item.imageURL }}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <Text style={{ fontWeight: 800, fontSize: 12, color: '#ffffff' }}>
                            {item.username}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(_, index) => String(index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
}