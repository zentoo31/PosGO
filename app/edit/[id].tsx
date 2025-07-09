import { Product } from '@/models/product';
import { ProductService } from '@/services/product.service';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const productService = new ProductService();
  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [picUrl, setPicUrl] = useState('');

  const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProductById(id as string);
        setProduct(fetchedProduct);
        setName(fetchedProduct.name);
        setDescription(fetchedProduct.description);
        setPrice(fetchedProduct.price.toFixed(2));
        setStock(String(fetchedProduct.stock));
        setCategory(String(fetchedProduct.category)); // nuevo
        setPicUrl(fetchedProduct.imageUrl || '');
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!name || !description || !price || !stock || !category) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
      }

      const updatedProduct = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category: parseInt(category),
        imageUrl: picUrl.trim() !== '' ? picUrl : DEFAULT_IMAGE,
      };

      await productService.updateProduct(id as string, updatedProduct);
      Alert.alert('Éxito', 'Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto.');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-[#16429E]'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View
          style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
          className='flex-1'
        >
          <View className='flex-row items-center justify-between px-4 py-4'>
            <TouchableOpacity
              onPress={() => router.back()}
              className='pr-4 py-1'
              accessibilityLabel='Volver'
            >
              <Feather name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold text-white flex-1 text-center'>
              {product?.name ? 'Detalles' : 'Cargando...'}
            </Text>
            <View style={{ width: 60 }} />
          </View>

          <View className='bg-white flex-1 px-6 pt-6 pb-10'>
            {product ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                <View className='items-center mb-6'>
                  {picUrl ? (
                    <Image
                      source={{ uri: picUrl }}
                      className='w-48 h-48 rounded-xl border border-gray-300'
                      resizeMode='cover'
                    />
                  ) : (
                    <View className='w-48 h-48 rounded-xl border border-gray-300 bg-gray-200 items-center justify-center'>
                      <Text className='text-gray-500'>Sin imagen</Text>
                    </View>
                  )}
                </View>

                <View className='space-y-6'>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Imagen (URL)</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={picUrl}
                      onChangeText={setPicUrl}
                      editable
                      placeholder='https://...'
                      autoCapitalize='none'
                    />
                  </View>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Nombre</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={name}
                      onChangeText={setName}
                      editable
                      placeholder='Nombre del producto'
                    />
                  </View>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Descripción</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={description}
                      onChangeText={setDescription}
                      editable
                      placeholder='Descripción'
                      multiline
                      numberOfLines={4}
                      textAlignVertical='top'
                    />
                  </View>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Precio (S/)</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={price}
                      onChangeText={setPrice}
                      editable
                      keyboardType='decimal-pad'
                      placeholder='Precio'
                    />
                  </View>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Stock</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={stock}
                      onChangeText={setStock}
                      editable
                      keyboardType='numeric'
                      placeholder='Stock'
                    />
                  </View>

                  <View>
                    <Text className='text-base font-semibold mb-1 text-gray-800'>Categoría (ID)</Text>
                    <TextInput
                      className='border border-gray-300 rounded-xl px-4 py-3 text-gray-900 bg-gray-50'
                      value={category}
                      onChangeText={setCategory}
                      editable
                      keyboardType='numeric'
                      placeholder='Ej: 1'
                    />
                  </View>

                  <TouchableOpacity
                    className='bg-[#16429E] rounded-xl py-4 mt-4'
                    onPress={handleUpdate}
                  >
                    <Text className='text-white text-center text-lg font-semibold'>
                      Actualizar Producto
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <ActivityIndicator size='large' color='#0000ff' className='mt-10' />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductDetail;