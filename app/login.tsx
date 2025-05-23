import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
const login = () => {
  return (
    <View className="flex-1 justify-center items-center gap-5">
        <View className='flex-row items-center gap-5'>
            <Feather name="shopping-bag" size={48} color="black" />
            <Text className='text-4xl font-bold'>PosGo</Text>
        </View>
        <Text>Welcome back! Sign in to your account</Text>
        <View className='flex-col items-center gap-5 mt-10'>
            <Text className='text-2xl font-extrabold'>Sign in</Text>
            <View className='gap-2'>
                <Text className='text-gray-700 font-bold'>Email</Text>
            <View className='bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]'>
                <Feather name="user" size={24} color="gray" />
                <Text className='text-gray-500'></Text>
                <TextInput className='w-full h-full px-5' placeholder='you@example.com'></TextInput>
            </View>
            <Text className='text-gray-700 font-bold'>Password</Text>
            <View className='bg-gray-50 w-80 h-12 rounded-md flex-row items-center px-5 border-gray-500 border-[1px]'>
                <Feather name="lock" size={24} color="gray" />
                <TextInput className='w-full h-full px-5' placeholder='**********' ></TextInput>
            </View>
            <Link href={"/register"} asChild>
                <Pressable className='bg-blue-500 w-80 h-12 rounded-md flex-row items-center justify-center mt-5' >
                    <Text className='text-white'>Sign in</Text>
                </Pressable>
            </Link>
            </View>
        </View>
    </View>
  )
}

export default login

const styles = StyleSheet.create({})