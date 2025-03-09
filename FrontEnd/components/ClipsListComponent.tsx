import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import VideoComponent from "./VideoComponent";

import { Clip } from "../hardcode/clips";

export default function ClipsList({
    onSelectVideo,
    CLIPS
}: {
    onSelectVideo: (video: string) => void;
    CLIPS: Clip[]
}) {
    return (
        <FlatList
            data={CLIPS}
            renderItem={({ item }: { item: Clip }) => (
                <TouchableOpacity
                    style={{ width: 100, height: 140, borderRadius: 15 }}
                    onPress={() => onSelectVideo(item.videoURL)}>
                    <View style={{ position: "absolute", gap: 5, width: "100%", height: "100%" }}>
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