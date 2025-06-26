import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const RegisterProd = () => {
  return (
    <View className='p-4 bg-white rounded-t-lg border-b-[0.5px] border-gray-300 flex-row gap-2'>
        <View className='h-12 rounded-md flex-row items-center px-5 border-gray-300 border-[1px]'>
            <Feather name="codesandbox" size={24} color="gray" />
            <Text className='text-gray-500'></Text>
            <TextInput className='h-full px-5' placeholder='Escanea el código qr'></TextInput>
        </View>
        <Link href={"/addProduct"} asChild>
            <Pressable className='bg-blue-500 rounded-lg flex-row items-center p-2' >
                <Feather name="plus" size={24} color="white" />
                <Text className='text-white text-center'>Añadir</Text>
            </Pressable>
        </Link>
    </View>
  )
}

export default RegisterProd