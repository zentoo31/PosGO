import { LoginDto } from '@/dto/loginDto';
import { AuthService } from '@/services/auth.service';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const login = () => {
  const authService = new AuthService();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const storeTokens = async (accessToken: string, refreshToken: string) => {
    try{
      await AsyncStorage.multiSet([
        ['@access_token', accessToken],
        ['@refresh_token', refreshToken]
      ])
    }catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await authService.login(loginData);
      await storeTokens(response?.session?.access_token, response?.session.refresh_token);
      ToastAndroid.show('Inicio de sesión exitoso', ToastAndroid.SHORT);
      router.push('/home');
    } catch (error) {
      ToastAndroid.show(`Error: ${error}`, ToastAndroid.SHORT);
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center gap-5 px-4">
            <View className="flex-row items-center gap-5">
              <Feather name="shopping-bag" size={48} color="black" />
              <Text className="text-4xl font-bold">PosGo</Text>
            </View>
            <Text>Bienvenido! Inicia sesión con tu cuenta</Text>
            <View className="flex-col items-center gap-5 mt-10">
              <Text className="text-2xl font-extrabold">Iniciar sesión</Text>
              <View className="gap-2">
                <Text className="text-gray-700 font-bold">Correo</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]">
                  <Feather name="user" size={24} color="gray" />
                  <TextInput
                    className="w-full h-full px-5"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => setLoginData({ ...loginData, email: text })}
                  />
                </View>
                <Text className="text-gray-700 font-bold">Contraseña</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]">
                  <Feather name="lock" size={24} color="gray" />
                  <TextInput
                    className="w-full h-full px-5"
                    placeholder="**********"
                    secureTextEntry
                    onChange={(text) => setLoginData({ ...loginData, password: text.nativeEvent.text })}
                  />
                </View>
                  <TouchableOpacity className="bg-blue-500 w-80 h-12 rounded-md flex-row items-center justify-center mt-5"
                    onPress={handleLogin}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text className="text-white">Entrar</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default login;
