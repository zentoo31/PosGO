import { CreateProduct } from '@/dto/createProductDto';
import { Category } from '@/models/category';
import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/product.service';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
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
  View
} from 'react-native';

const AddProduct = () => {

  const categoryService = new CategoryService();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'No se pudieron cargar las categorías. Intente nuevamente.');
      }
    };

    fetchCategories();
    
  }, []);
  const [formData, setFormData] = useState<CreateProduct>({
    name: '',
    description: '',
    price: 0,
    category: 0,
    stock: 0,
    imageUrl: ''
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number, name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const productService = new ProductService();

  const handleInputChange = (field: keyof CreateProduct, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategorySelect = (category: { id: number, name: string }) => {
    setSelectedCategory(category);
    setFormData(prev => ({
      ...prev,
      category: category.id
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

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category, // Enviar como string o número según lo que espere tu backend
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl?.trim() || undefined
      };

      // Llamada al servicio para crear el producto
      const createdProduct = await productService.createProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        stock: productData.stock,
        imageUrl: productData.imageUrl
      });

      Alert.alert(
        'Éxito',
        `Producto "${productData.name}" creado correctamente`,
        [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              router.back(); // Opcional: volver atrás después de crear
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error al crear producto:', error);
      Alert.alert('Error', 'No se pudo agregar el producto. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 0,
      stock: 0,
      imageUrl: ''
    });
    setSelectedCategory(null);
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
              onPress={() => router.back()}
              className='pr-4 py-1'
              accessibilityLabel="Volver"
              disabled={isLoading}
            >
              <Feather name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold text-white flex-1 text-center'>Agregar producto</Text>
            <View style={{ width: 60 }} />
          </View>

          {/* Form Container */}
          <View className='bg-gray-50 h-full'>
            <ScrollView className='px-4 pt-6' showsVerticalScrollIndicator={false}>

              {/* Product Name */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Nombre del producto</Text>
                <TextInput
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                  placeholderTextColor={'gray'}
                  placeholder='Ej: Manzana'
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  maxLength={100}
                  editable={!isLoading}
                />
                <Text className='text-gray-500 text-xs mt-1'>{formData.name.length}/100</Text>
              </View>

              {/* Description */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Descripción</Text>
                <TextInput
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                  placeholder='Describe el producto...'
                  placeholderTextColor={'gray'}
                  value={formData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  multiline
                  numberOfLines={3}
                  textAlignVertical='top'
                  maxLength={500}
                  editable={!isLoading}
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
                    placeholderTextColor={'gray'}
                    value={formData.price.toString()}
                    onChangeText={(value) => handleInputChange('price', value)}
                    keyboardType='decimal-pad'
                    editable={!isLoading}
                  />
                </View>
                <View className='flex-1'>
                  <Text className='text-gray-700 font-semibold mb-2'>Stock</Text>
                  <TextInput
                    className='bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800'
                    placeholder='10'
                    placeholderTextColor={'gray'}
                    value={formData.stock.toString()}
                    onChangeText={(value) => handleInputChange('stock', value)}
                    keyboardType='numeric'
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Category Dropdown */}
              <View className='mb-4'>
                <Text className='text-gray-700 font-semibold mb-2'>Categoría</Text>
                <TouchableOpacity
                  className='bg-white border border-gray-200 rounded-lg px-4 py-3'
                  onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  disabled={isLoading}
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
                  placeholderTextColor={'gray'}
                  editable={!isLoading}
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
                className='bg-[#4A90E2] rounded-lg py-4 mb-8 flex-row justify-center items-center'
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ActivityIndicator color="white" className='mr-2' />
                    <Text className='text-white text-center text-lg font-bold'>
                      Procesando...
                    </Text>
                  </>
                ) : (
                  <Text className='text-white text-center text-lg font-bold'>
                    Agregar producto
                  </Text>
                )}
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProduct;