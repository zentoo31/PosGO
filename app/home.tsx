import RegisterProd from '@/components/registerProd';
import Searcher from '@/components/searcher';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const router = useRouter();
  const [addition, setAddition] = useState<number>(0);

  const getAdditionValue = async () => {
    const stored = await AsyncStorage.getItem('addition');
    const items = stored ? JSON.parse(stored) : [];
    const total = items.reduce((sum: number, item: { price: number }) => sum + item.price, 0);
    setAddition(total);
  };

  useEffect(() => {
    getAdditionValue();
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-[#16429E]'>
      <StatusBar backgroundColor="#16429E" barStyle="light-content" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View
          style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        >
          <View className='flex-row items-center justify-between px-4 py-4'>
            <View className='flex-row items-center'>
              <Feather name="shopping-bag" size={24} color="white" />
              <Text className='text-2xl font-bold text-white ml-2'>PosGo</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/cart')} className='flex-row items-center gap-2 bg-blue-500 px-4 rounded-lg py-1'>
                <Feather name="shopping-cart" size={24} color="white" />
                <Text className='text-white text-lg mr-2'>
                  S/. {addition.toFixed(2)}
                </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='bg-[#F9FAFB] px-4 pt-6 flex-1 '>
          <Text className='font-bold text-2xl mb-4'>Punto de venta</Text>
          <View className='shadow-lg border-[0.5px] border-gray-300 rounded-md bg-white flex-1'>
            <RegisterProd />
            <Searcher onAddItem={getAdditionValue}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
