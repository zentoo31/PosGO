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

export default function Register() {
  const authService = new AuthService();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterDto>({
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await authService.register(registerData);
      ToastAndroid.show(`Registro exitoso!`, ToastAndroid.SHORT);
      router.push('/login');
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-4 pt-12 pb-24">
            <View className="flex-row items-center gap-5 mb-4">
              <Feather name="shopping-bag" size={48} color="black" />
              <Text className="text-4xl font-bold">PosGo</Text>
            </View>
            <Text>Bienvenido a PosGo! Regístrate con tu correo</Text>

            <View className="flex-col items-center gap-5 mt-10">
              <Text className="text-2xl font-extrabold">Registro</Text>

              {/* Email */}
              <View className="gap-2">
                <Text className="text-gray-700 font-bold">Correo</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border border-gray-400">
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

                {/* Password */}
                <Text className="text-gray-700 font-bold mt-4">Contraseña</Text>
                <View className="bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border border-gray-400">
                  <Feather name="lock" size={24} color="gray" />
                  <TextInput
                    className="w-full h-full px-5"
                    placeholder="**********"
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
                  />
                </View>

                <TouchableOpacity
                  className="bg-blue-500 w-80 h-12 rounded-md flex-row items-center justify-center mt-6"
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  <Text className="text-white font-bold">Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row items-center gap-2 mt-10">
              <Text className="text-gray-500">¿Ya tienes cuenta?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-blue-500 font-semibold">Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
