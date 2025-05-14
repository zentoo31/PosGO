import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-blue-300">Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/login"}>Iniciar sesión</Link>
    </View>
  );
}
