import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Profile = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    pic_url: '',
    name: '',
    city: '',
    country: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    Alert.alert('Perfil actualizado', 'Tus datos han sido guardados.');
    // Aquí puedes hacer la petición a Supabase o tu API Nest
  };

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, cerrar',
          style: 'destructive',
          onPress: handleLogout,
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setTimeout(() => {
        router.dismissAll();
        router.push('/');
      }, 200);
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-[#16429E]'>
      <StatusBar backgroundColor="#16429E" barStyle="light-content" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
          <View className='flex-row items-center justify-center px-4 py-4'>
            <Text className='text-2xl font-bold text-white'>Editar perfil</Text>
          </View>
        </View>

        <View className='bg-[#F9FAFB] px-4 pt-6 flex-1'>
          <ScrollView className='flex-1'>
            <View className='items-center mb-4'>
              {form.pic_url ? (
                <Image
                  source={{ uri: form.pic_url }}
                  className='w-24 h-24 rounded-full bg-gray-200'
                />
              ) : (
                <View className='w-24 h-24 rounded-full bg-gray-300 items-center justify-center'>
                  <Text className='text-gray-500'>Sin imagen</Text>
                </View>
              )}
            </View>

            <TextInput
              className='bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4 text-gray-900'
              placeholder="URL de imagen"
              placeholderTextColor={'gray'}
              value={form.pic_url}
              onChangeText={text => handleChange('pic_url', text)}
            />

            <TextInput
              className='bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4 text-gray-900'
              placeholder="Nombre"
              placeholderTextColor={'gray'}
              value={form.name}
              onChangeText={text => handleChange('name', text)}
            />

            <TextInput
              className='bg-white px-4 py-3 rounded-lg border border-gray-300 mb-4 text-gray-900'
              placeholder="Ciudad"
              placeholderTextColor={'gray'}
              value={form.city}
              onChangeText={text => handleChange('city', text)}
            />

            <TextInput
              className='bg-white px-4 py-3 rounded-lg border border-gray-300 mb-6 text-gray-900'
              placeholder="País"
              placeholderTextColor={'gray'}
              value={form.country}
              onChangeText={text => handleChange('country', text)}
            />

            <TouchableOpacity
              className='bg-blue-500 rounded-lg py-3 mb-4'
              onPress={handleSubmit}
            >
              <Text className='text-white text-center font-bold text-lg'>Guardar cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='bg-red-500 rounded-lg py-3 mb-10'
              onPress={confirmLogout}
            >
              <Text className='text-white text-center font-bold text-lg'>Cerrar sesión</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
