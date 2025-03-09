import { View } from "react-native";
import VideoComponent from "./VideoComponent";

interface ClipFullScreenProps { videoURL: string, name: string, username: string, content: string, tags: string[] }

export default function ClipFullScreen({ videoURL, name, username, content, tags }: ClipFullScreenProps) {
    return (
        <View style={{ position: "relative" }}>
            <VideoComponent videoSource={videoURL} fullScreen={true} />
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", gap: 4 }}>
                {name}
                {username}
                {content}
                {tags}
            </View>
        </View>
    )
}