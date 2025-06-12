import { Link } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from "react-native";


const videoSource =
  '../assets/video/pos_video_hd_1920_1080_30fps.mp4';

export default function Index() {

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View className="flex-1 justify-center items-center ">
      <VideoView
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
      <Link href={"/login"}>Iniciar sesión</Link>
    </View>
  );
}
