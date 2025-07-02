import WelcomePage from "@/components/welcomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const checkWelcomePage = async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenWelcome");
        if (seen) {
          setHasSeenWelcome(true);
        }
      } catch (error) {
        console.error("Error checking welcome page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWelcomePage();
  }, []);

  const handleWelcomeComplete = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', JSON.stringify(true));
      setHasSeenWelcome(true);
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return hasSeenWelcome ? (
    <Redirect href={'/login'}/>
  ): (
    <WelcomePage onComplete={handleWelcomeComplete} />
  )
}
