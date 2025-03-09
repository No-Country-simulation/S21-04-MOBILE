import { TouchableOpacity, View, Image, Text } from 'react-native';
import Clip from '../interfaces/clip-interface';
import VideoComponent from './VideoComponent';

interface PreviewClipProps {
  item: Clip;
  onSelectClip: (c: Clip) => void;
  detailUser?: boolean;
}

export default function PreviewClipComponent({
  onSelectClip,
  item,
  detailUser = true,
}: PreviewClipProps) {
  return (
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
      {detailUser && (
        <View
          style={{
            position: 'absolute',
            gap: 5,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            margin: detailUser ? 0 : 4,
          }}>
          <Image
            source={{ uri: item.imageURL }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <Text style={{ fontWeight: 800, fontSize: 12, color: '#ffffff' }}>
            {item.username}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}