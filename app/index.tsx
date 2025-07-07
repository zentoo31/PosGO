import WelcomePage from "@/components/welcomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const checkAuthAndWelcome = async () => {
      try {
        // Verificar el welcome y el token de acceso
        const [seen, accessToken] = await Promise.all([
          AsyncStorage.getItem("hasSeenWelcome"),
          AsyncStorage.getItem("@access_token")
        ]);
        
        setHasSeenWelcome(!!seen);
        setHasAccessToken(!!accessToken);
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndWelcome();
  }, []);

  const handleWelcomeComplete = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
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

  // Lógica de redirección priorizada
  if (!hasSeenWelcome) {
    return <WelcomePage onComplete={handleWelcomeComplete} />;
  }

  // Si ya vió el welcome, redirigir según tenga token o no
  return hasAccessToken ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/login" />
  );
}