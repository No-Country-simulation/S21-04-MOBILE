import { FlatList, TouchableOpacity } from "react-native";
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
                    <VideoComponent videoSource={item.videoURL} />
                </TouchableOpacity>
            )}
            keyExtractor={(_: Clip, index: number) => String(index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}