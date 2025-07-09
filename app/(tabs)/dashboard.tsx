import { GeminiService } from '@/services/gemini.service';
import { ProductService } from '@/services/product.service';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';
import Markdown from 'react-native-markdown-display';

const Dashboard = () => {
  const geminiService = new GeminiService();
  const productService = new ProductService();
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const products = await productService.getAllProducts();
      const productNames = JSON.stringify(products, null, 2);
      const prompt = productNames;
      const text = await geminiService.generateText(prompt);
      setResponseText(text);
    } catch (error) {
      console.error('Error generating text:', error);
      setResponseText('Error al generar el texto');
    } finally {
      setLoading(false);
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
            <Text className='text-2xl font-bold text-white'>Resumen</Text>
          </View>
        </View>

        <ScrollView
          className='bg-[#F9FAFB] px-4 pt-6 flex-1'
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className='mt-4 shadow-lg border-[0.5px] border-gray-300 rounded-md bg-white p-4'>
            <Text className='text-lg font-bold mb-2'>Generar Resumen con IA</Text>
            <Text className='text-gray-600 mb-2'>Presiona el botón para generar un resumen:</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Markdown>{responseText}</Markdown>
            )}
            <View className='flex-row justify-end'>
              <Button title="Generar resumen" onPress={handleGenerateText} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Dashboard;
