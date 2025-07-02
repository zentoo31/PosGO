import { Text } from '@react-navigation/elements';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
type WelcomePageProps = {
  onComplete: () => void;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
  return (
    <View className="flex-1 justify-center items-center ">
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={onComplete}
      >
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomePage