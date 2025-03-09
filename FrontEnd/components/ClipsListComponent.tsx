import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import VideoComponent from "./VideoComponent";

import { Clip } from "../hardcode/clips";

export default function ClipsList({
    onSelectVideo,
    CLIPS
}: {
    onSelectVideo: (video: Clip) => void;
    CLIPS: Clip[]
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
                    onPress={() => onSelectVideo(item)}>
                    <View style={{
                        width: 110,
                        height: 160,
                        borderRadius: 5,
                        marginHorizontal: 4,
                        position: 'relative',
                    }}>
                        <Image source={{ uri: item.imageURL }} style={{ width: 40, height: 40, borderRadius: 100 }} />
                        <Text style={{ fontWeight: 800, fontSize: 12, color: "#ffffff" }}>{item.username}</Text>
                    </View>
                    <VideoComponent videoSource={item.videoURL} />
                </TouchableOpacity>
            )}
            keyExtractor={(_: Clip, index: number) => String(index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}