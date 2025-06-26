import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';

const cart = () => {
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
          }}>
          <View className='flex-row items-center justify-center px-4 py-3'>
            <Text className='text-2xl font-bold text-white'>Carrito</Text>
          </View>

          <Text>cart</Text>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default cart