import { Feather } from '@expo/vector-icons';
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type WelcomePageProps = {
  onComplete: () => void;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
  const videoSource: VideoSource = {
    assetId: require('../assets/video/pos_video_hd_1920_1080_30fps.mp4'),
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.play();
    player.loop = true;
    player.muted = true;
  });

  return (
    <View className="flex-1">
      <VideoView
        player={player}
        style={{ ...StyleSheet.absoluteFillObject, opacity: 0.5 }}
        contentFit="cover"
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        showsTimecodes={false}
        nativeControls={false}
      />

      <View className="flex-1 justify-between items-center pt-20 pb-20 px-6">
        <View className="flex-row items-center">
          <Feather name="shopping-bag" size={64} color="white" />
          <Text className="text-5xl font-bold text-white ml-3">PosGo</Text>
        </View>

        <TouchableOpacity
          onPress={onComplete}
          className="bg-blue-600 px-8 py-4 rounded-lg shadow-md"
        >
          <Text className="text-white text-lg font-bold tracking-wider">
            Comenzar con PosGo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomePage;
