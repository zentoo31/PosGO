import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface CartItem {
  price: number;
  nombre: string;
  quantity?: number;
  pic?: string;
}

const cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const loadCartItems = async () => {
    try {
      const current = await AsyncStorage.getItem('addition');
      const currentArray = current ? JSON.parse(current) : [];
      
      // Agrupar items por nombre y contar cantidades
      const groupedItems = currentArray.reduce((acc: CartItem[], item: CartItem) => {
        const existingItem = acc.find(i => i.nombre === item.nombre);
        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
          acc.push({...item, quantity: 1});
        }
        return acc;
      }, []);

      setCartItems(groupedItems);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce((acc, item) => {
      return acc + (item.price * (item.quantity || 1));
    }, 0);
    setTotal(sum);
  };

  const clearCart = async () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que quieres eliminar todos los items del carrito?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Vaciar',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('addition');
              setCartItems([]);
              setTotal(0);
            } catch (error) {
              console.error('Error al vaciar el carrito:', error);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const removeItem = async (nombre: string) => {
    try {
      const current = await AsyncStorage.getItem('addition');
      const currentArray = current ? JSON.parse(current) : [];
      
      // Filtrar todos los items con este nombre
      const newArray = currentArray.filter((item: CartItem) => item.nombre !== nombre);
      
      await AsyncStorage.setItem('addition', JSON.stringify(newArray));
      loadCartItems(); // Recargar los items
    } catch (error) {
      console.error('Error al eliminar item:', error);
    }
  };

  const handlePurchase = () => {
    Alert.alert(
      'Confirmar compra',
      `Total a pagar: S/.${total.toFixed(2)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Aquí iría la lógica para procesar la compra
            Alert.alert('Compra realizada', '¡Gracias por tu compra!');
            AsyncStorage.removeItem('addition');
            setCartItems([]);
            setTotal(0);
          },
        },
      ],
    );
  };

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
          <View className='flex-row items-center justify-between px-4 py-4'>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className='pr-4 py-1'
              accessibilityLabel="Volver"
            >
              <Text className='text-white text-lg font-bold'>{'< Volver'}</Text>
            </TouchableOpacity>
            <Text className='text-2xl font-bold text-white flex-1 text-center'>Carrito</Text>
            <TouchableOpacity onPress={clearCart}>
              <Text className='text-white text-lg font-bold'>Vaciar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className='h-full bg-white p-4'>
            {cartItems.length === 0 ? (
              <View className='flex-1 items-center justify-center py-10'>
                <Text className='text-gray-500 text-lg'>El carrito está vacío</Text>
              </View>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <View key={index} className='flex-row items-center py-3 border-b border-gray-200'>
                    <Image 
                      source={{ uri: item.pic }} // Reemplaza con tu imagen
                      className='w-12 h-12 rounded-md mr-3'
                    />
                    <View className='flex-1'>
                      <Text className='text-lg font-semibold'>{item.nombre}</Text>
                      <Text className='text-gray-600'>S/.{item.price.toFixed(2)}</Text>
                    </View>
                    <Text className='text-gray-600 mr-3'>x{item.quantity}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.nombre)}>
                      <Text className='text-red-500'>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View className='mt-6 border-t border-gray-200 pt-4'>
                  <View className='flex-row justify-between mb-4'>
                    <Text className='text-lg font-bold'>Total:</Text>
                    <Text className='text-lg font-bold'>S/.{total.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity 
                    className='bg-[#16429E] py-3 rounded-lg items-center'
                    onPress={handlePurchase}
                  >
                    <Text className='text-white font-bold text-lg'>Comprar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default cart;