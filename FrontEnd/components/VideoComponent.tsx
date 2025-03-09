import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export default function VideoComponent({
  videoSource,
  fullScreen = false,
}: {
  videoSource: string;
  fullScreen?: boolean;
}) {
  const ref = useRef(null);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
  });

  useEffect(() => {
    if (fullScreen) {
      player.play();
    }
  }, [fullScreen, player]);

  return (
    <VideoView ref={ref} style={styles.video} contentFit={"cover"} player={player} nativeControls={false} />
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    borderRadius: "inherit",
  },
});
