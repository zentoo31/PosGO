import { RegisterDto } from '@/dto/registerDto';
import { AuthService } from '@/services/auth.service';
import Feather from '@expo/vector-icons/Feather';
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

export default function register() {
  const authService = new AuthService();
  const[isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterDto>({
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await authService.register(registerData);
      ToastAndroid.show(`Registro exitoso: ${response}`, ToastAndroid.SHORT);
      router.push('/login');
    } catch (error) {
      ToastAndroid.show(`Error: ${error}`, ToastAndroid.SHORT);
      console.error('Registration failed:', error);
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
            <Text>Bienvenido a PosGo! Regístrate con tu correo!</Text>
            <View className="flex-col items-center gap-5 mt-10">
              <Text className="text-2xl font-extrabold">Registro</Text>
              <View className="gap-2">
                <Text className="text-gray-700 font-bold">Correo</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]">
                  <Feather name="user" size={24} color="gray" />
                  <TextInput
                    className="w-full h-full px-5"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    placeholderTextColor={'gray'}
                    autoCapitalize="none"
                    onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
                  />
                </View>

                <Text className="text-gray-700 font-bold">Contraseña</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]">
                  <Feather name="lock" size={24} color="gray" />
                  <TextInput
                    className="w-full h-full px-5"
                    placeholder="**********"
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
                  />
                </View>

                  <TouchableOpacity className="bg-blue-500 w-80 h-12 rounded-md flex-row items-center justify-center mt-5"
                    onPress={handleRegister}
                    disabled={isLoading}
                  >
                    <Text className="text-white">Regístrate</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
