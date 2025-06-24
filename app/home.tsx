import Searcher from '@/components/searcher';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, View } from 'react-native';

const home = () => {
  return (
    <View className='flex-1 pt-9 pb-7 bg-[#16429E]' >
        <View className='flex-row items-start p-2'>
            <Feather name="shopping-bag" size={24} color="white"/>
            <Text className='text-2xl font-bold text-white ml-2'>PosGo</Text>
        </View>
        <View className='bg-[#F9FAFB] p-10 h-full'>
            <Text className='font-bold text-2xl'>Point of Sale</Text>
            <View className='shadow-lg border-[0.5px] border-gray-300 rounded-md bg-white'>
                <Searcher/>
            </View>
        </View>
    </View>
  )
}


export default home