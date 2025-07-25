import { Product } from '@/models/product';
import { ProductService } from '@/services/product.service';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SearcherEdit() {
    const productService = new ProductService();
    const [busqueda, setBusqueda] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const fetchedProducts = await productService.getAllProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (query: string) => {
        try {
            setLoading(true);
            if (query.trim() === '') {
                const allProducts = await productService.getAllProducts();
                setProducts(allProducts);
            } else {
                const searched = await productService.getProductsByName(query);
                setProducts(searched);
            }
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchProducts(busqueda);
        }, 500); // retraso de 500ms entre cada búsqueda

        return () => clearTimeout(timer);
    }, [busqueda]);

    const renderItem = ({ item }: { item: { id: string; nombre: string, pic: string; price: number, category: { name: string, color: string }, stock: number } }) => (
        <View className="flex-row items-center border-[0.5px] border-gray-300 rounded-lg mb-3 p-2 bg-white">
            <Image source={{ uri: item.pic }} className="w-20 h-20 rounded-md mr-4" />
            <View className="flex-1">
                <Text className="text-base font-semibold">{item.nombre}</Text>
                <Text style={{ color: item.category.color }} className="text-sm">{item.category.name}</Text>
                <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-lg font-bold">S/. {item.price.toFixed(2)}</Text>
                    <Text className="text-sm text-gray-500">Stock: {item.stock}</Text>
                </View>
            </View>
            <TouchableOpacity className="ml-4 bg-blue-500 rounded-md p-2 flex-row items-center justify-center" onPress={() =>  router.push({pathname: '/edit/[id]', params:{id: item.id}})}>
                <Feather name="edit-2" size={20} color="white" /> 
                <Text className="text-white ml-2">Editar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="p-4 bg-white rounded-lg flex-1">
            <TextInput
                className="px-4 py-3 rounded-lg mb-4 border-[0.5px] border-gray-300 text-gray-900"
                placeholder="Buscar productos..."
                placeholderTextColor={'gray'}
                value={busqueda}
                onChangeText={setBusqueda}
            />


            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={products.map((item) => ({
                        id: String(item.id),
                        nombre: item.name ?? '',
                        pic: item.imageUrl ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
                        price: item.price ?? 0,
                        category: {
                            name: item.category?.name ?? 'Sin categoría',
                            color:'#000000',
                        },
                        stock: item.stock ?? 0,
                    }))}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 8 }}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text className="text-center text-gray-400 mt-6">
                            No hay resultados
                        </Text>
                    }
                />
            )}
        </View>
    );
}