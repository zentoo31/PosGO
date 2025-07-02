import React, { useState } from 'react';
import {
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
  View
} from 'react-native';

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  imageUrl: string;
}

const categories = [
  { id: 1, name: 'Frutas' },
  { id: 2, name: 'Lácteos' },
  { id: 3, name: 'Panadería' },
  { id: 4, name: 'Carnes' },
  { id: 5, name: 'Otros' }
];

const addProduct = () => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: ''
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{id: number, name: string} | null>(null);

  const handleInputChange = (field: keyof ProductData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategorySelect = (category: {id: number, name: string}) => {
    setSelectedCategory(category);
    setFormData(prev => ({
      ...prev,
      category: category.id.toString()
    }));
    setShowCategoryDropdown(false);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre del producto es requerido');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'La descripción es requerida');
      return false;
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      Alert.alert('Error', 'Ingrese un precio válido');
      return false;
    }
    if (!formData.category) {
      Alert.alert('Error', 'Seleccione una categoría');
      return false;
    }
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      Alert.alert('Error', 'Ingrese un stock válido');
      return false;
    }
    if (formData.name.length > 100) {
      Alert.alert('Error', 'El nombre no puede exceder 100 caracteres');
      return false;
    }
    if (formData.description.length > 500) {
      Alert.alert('Error', 'La descripción no puede exceder 500 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: Number(formData.category),
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl.trim() || undefined
      };

      // Aquí harías la llamada a tu API
      console.log('Producto a enviar:', productData);
      
      Alert.alert(
        'Éxito', 
        'Producto agregado correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                imageUrl: ''
              });
              setSelectedCategory(null);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el producto');
    }
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
          
          {/* Header */}
          <View className='flex-row items-center justify-center px-4 py-3'>
            <Text className='text-2xl font-bold text-white'>Agregar producto</Text>
          </View>

          {/* Form Container */}
          <View className=' bg-gray-50 mt-4 rounded-t-3xl'>
            <ScrollView className=' px-4 pt-6' showsVerticalScrollIndicator={false}>
              
              {/* Product Name */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Nombre del producto</Text>
                <TextInput
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                  placeholder='Ej: Manzana'
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  maxLength={100}
                />
                <Text className='text-gray-500 text-xs mt-1'>{formData.name.length}/100</Text>
              </View>

              {/* Description */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Descripción</Text>
                <TextInput
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                  placeholder='Describe el producto...'
                  value={formData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  multiline
                  numberOfLines={3}
                  textAlignVertical='top'
                  maxLength={500}
                />
                <Text className='text-gray-500 text-xs mt-1'>{formData.description.length}/500</Text>
              </View>

              {/* Price and Stock Row */}
              <View className='flex-row mb-4 gap-3'>
                <View className='flex-1'>
                  <Text className='text-gray-700 font-semibold mb-2'>Precio (S/.)</Text>
                  <TextInput
                    className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                    placeholder='0.00'
                    value={formData.price}
                    onChangeText={(value) => handleInputChange('price', value)}
                    keyboardType='decimal-pad'
                  />
                </View>
                <View className='flex-1'>
                  <Text className='text-gray-700 font-semibold mb-2'>Stock</Text>
                  <TextInput
                    className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                    placeholder='10'
                    value={formData.stock}
                    onChangeText={(value) => handleInputChange('stock', value)}
                    keyboardType='numeric'
                  />
                </View>
              </View>

              {/* Category Dropdown */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Categoría</Text>
                <TouchableOpacity
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3'
                  onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <Text className={selectedCategory ? 'text-gray-800' : 'text-gray-400'}>
                    {selectedCategory ? selectedCategory.name : 'Seleccionar categoría'}
                  </Text>
                </TouchableOpacity>
                
                {showCategoryDropdown && (
                  <View className='bg-white border border-gray-200 rounded-lg mt-1 overflow-hidden'>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        className='px-4 py-3 border-b border-gray-100'
                        onPress={() => handleCategorySelect(category)}
                      >
                        <Text className='text-gray-800'>{category.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Image URL */}
              <View className='mb-6'>
                <Text className='text-gray-700 font-semibold mb-2'>URL de imagen (opcional)</Text>
                <TextInput
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                  placeholder='https://ejemplo.com/imagen.jpg'
                  value={formData.imageUrl}
                  onChangeText={(value) => handleInputChange('imageUrl', value)}
                  keyboardType='url'
                />
                {formData.imageUrl ? (
                  <View className='mt-3'>
                    <Text className='text-gray-600 text-sm mb-2'>Vista previa:</Text>
                    <Image
                      source={{ uri: formData.imageUrl }}
                      className='w-20 h-20 rounded-lg bg-gray-200'
                    />
                  </View>
                ) : null}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className='bg-[#4A90E2] rounded-lg py-4 mb-8'
                onPress={handleSubmit}
              >
                <Text className='text-white text-center text-lg font-bold'>
                  Agregar producto
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default addProduct;