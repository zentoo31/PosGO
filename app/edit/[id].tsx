import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ProductDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className='flex-1 items-center justify-center bg-white'>
        <TouchableOpacity onPress={() => router.back()} className='absolute top-10 left-5'>
            <Text className='text-blue-500 text-lg'>Volver</Text>
        </TouchableOpacity>
      <Text className='text-2xl font-bold'>Producto ID: {id}</Text>
    </View>
  );
};

export default ProductDetail;
