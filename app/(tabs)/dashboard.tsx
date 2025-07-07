import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View
} from 'react-native'

const dashboard = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#16429E]'>
      <StatusBar backgroundColor="#16429E" barStyle="light-content" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
          <View className='flex-row items-center justify-center px-4 py-4'>
            <Text className='text-2xl font-bold text-white'>Dashboard</Text>
          </View>
        </View>

        <View className='bg-[#F9FAFB] px-4 pt-6 flex-1 '>
          <View className='shadow-lg border-[0.5px] border-gray-300 rounded-md bg-white flex-1'>
            <Text>dashboard</Text>
          </View>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default dashboard