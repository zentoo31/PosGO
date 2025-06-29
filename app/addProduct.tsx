import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';

const addProduct = () => {
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
            <Text className='text-2xl font-bold text-white'>Agregar producto</Text>
          </View>
          <Text className='text-white text-center mt-4'>Esta es la pantalla para agregar un nuevo producto.</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default addProduct