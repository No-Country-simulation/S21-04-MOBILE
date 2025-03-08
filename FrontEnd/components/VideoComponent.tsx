import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function VideoComponent({
  videoSource,
  fullScreen = false,
}: {
  videoSource: string;
  fullScreen?: boolean;
}) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (fullScreen) {
      player.play();
    }
  }, [fullScreen, player]);

  return (
    <VideoView style={styles.video} player={player} nativeControls={false} />
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
