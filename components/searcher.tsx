import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    View
} from 'react-native';

export default function Searcher() {
  const [busqueda, setBusqueda] = useState('');
  const [datos] = useState([
    { id: '1', nombre: 'Manzana', pic: 'https://www.recetasnestle.com.pe/sites/default/files/2022-07/tipos-de-manzana-royal-gala.jpg', price: 1.2, category: 'Frutas', stock:10 },
    { id: '2', nombre: 'Banana', pic: 'https://media.gettyimages.com/id/173242750/es/foto/racimo-de-pl%C3%A1tanos.jpg?s=612x612&w=gi&k=20&c=H6yBfWKtDnM7sRqcETrnis9V9XnkAiPaOnP77sOKooo=', price: 0.5, category: 'Frutas', stock:10 },
    { id: '3', nombre: 'Leche', pic: 'https://incalec.org/storage/2021/07/milk-and-glass-scaled.jpg', price: 1.0, category: 'Lácteos', stock:10 },
    { id: '4', nombre: 'Pan', pic: 'https://panoli.pe/wp-content/uploads/2020/02/IMG_0315-1.jpg', price: 1.5, category: 'Panadería', stock:10 },
    { id: '5', nombre: 'Carne Molida', pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnwhclycPN_bAZSaZ8lbHDF3eFEb7Jlvo8RA&s', price: 3.0, category: 'Carnes', stock:10 },
    { id: '6', nombre: 'Arroz', pic: 'https://www.allrecipes.com/thmb/RKpnSHLUDT2klppYgx8jAF47GyM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/52490-PuertoRicanSteamedRice-DDMFS-061-4x3-3c3da714aa614037ad1c135ec303526d.jpg', price: 0.8, category: 'Granos', stock:10 }
  ]);

  const datosFiltrados = datos.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderItem = ({ item }: { item: { id: string; nombre: string, pic: string; price: number, category: string, stock:number} }) => (
    <View className='flex-1 m-1 flex-col border-[0.5px] border-gray-300 rounded-lg'>
        <Image source={{uri: item.pic}} className='w-full h-32'/>
        <View className='p-2 flex-1'>
            <Text className="text-base mt-2">{item.nombre}</Text>
            <Text className='text-gray-300 text-sm'>{item.category}</Text>
            <View className='flex-row justify-between items-center mt-2'>
                <Text className='text-lg font-bold'>${item.price.toFixed(2)}</Text>
                <Text className='text-sm text-gray-500'>Stock: {item.stock}</Text>
            </View>
            <Pressable className='bg-blue-500 rounded-md p-2 mt-2 flex-row items-center justify-center'>
                <Feather name="shopping-cart" size={20} color="white" className='ml-3'/>
                <Text className='text-white text-center'>Agregar al carrito</Text>
            </Pressable>
        </View>
    </View>
  );

  return (
    <View className="p-4 bg-white rounded-lg">
      <TextInput
        className="bg-gray-100 px-4 py-3 rounded-lg mb-4"
        placeholder="Search products..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={datosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 8, paddingHorizontal: 8 }} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={renderItem}
        ListEmptyComponent={

          <Text className="text-center text-gray-400 mt-6">
            No hay resultados
          </Text>
        }
      />
    </View>
  );
}
