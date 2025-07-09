import * as MediaLibrary from 'expo-media-library';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

const Boleta = ({ cartItems, total }: { cartItems: any[], total: number }) => {
    const boletaRef = useRef(null);
    const date = new Date();

    const handleSaveBoleta = async () => {
        try {
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (!permission.granted) return;

            setTimeout(async () => {
                const uri = await captureRef(boletaRef, {
                    format: 'png',
                    quality: 1,
                });

                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('Boletas', asset, false);
                alert('Boleta guardada en galería.');
            }, 500);
        } catch (err) {
            console.error('Error al capturar boleta:', err);
        }
    };

    return (
        <View className="px-4 pb-4 mt-6">
            <View
                ref={boletaRef}
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                }}
            >
                {/* Encabezado */}
                <Text className="text-center font-bold text-lg">BODEGA MIRIAM</Text>
                <Text className="text-center text-xs">
                     LIMA - LIMA
                </Text>
                <Text className="text-center text-xs mb-2">Tel: 987654321</Text>

                <View className="border border-black p-2 mb-2">
                    <Text className="text-xs">R.U.C. N° 10106192281</Text>
                    <Text className="text-xs font-bold">BOLETA DE VENTA</Text>
                    <Text className="text-xs">N° 0001-{Math.floor(Math.random() * 10000)}</Text>
                </View>

                {/* Datos cliente (opcional) */}
                <Text className="text-xs mb-2">Cliente: ____________________</Text>
                <Text className="text-xs mb-2">DNI: ________________________</Text>

                {/* Tabla encabezado */}
                <View className="flex-row border-y border-gray-300 py-1">
                    <Text className="flex-1 text-xs font-bold">Descripción</Text>
                    <Text className="w-12 text-xs font-bold text-right">Cant</Text>
                    <Text className="w-16 text-xs font-bold text-right">P. Unit</Text>
                    <Text className="w-16 text-xs font-bold text-right">Total</Text>
                </View>

                {/* Items */}
                {cartItems.map((item, index) => (
                    <View key={index} className="flex-row border-b border-gray-200 py-1">
                        <Text className="flex-1 text-xs">{item.nombre}</Text>
                        <Text className="w-12 text-xs text-right">{item.quantity}</Text>
                        <Text className="w-16 text-xs text-right">S/.{item.price.toFixed(2)}</Text>
                        <Text className="w-16 text-xs text-right">
                            S/.{(item.price * item.quantity).toFixed(2)}
                        </Text>
                    </View>
                ))}

                {/* Total */}
                <View className="flex-row justify-end mt-2 border-t border-gray-300 pt-2">
                    <Text className="text-xs font-bold">TOTAL: </Text>
                    <Text className="text-xs font-bold ml-2">S/.{total.toFixed(2)}</Text>
                </View>

                {/* Pie */}
                <Text className="text-xs mt-4 text-center">Lima, {date.toLocaleString()}</Text>
                <Text className="text-xs text-center mt-2 italic">Gracias por su compra</Text>
            </View>

            {/* Botón guardar */}
            <TouchableOpacity
                className="bg-[#16429E] mt-4 rounded-lg py-3 items-center"
                onPress={handleSaveBoleta}
            >
                <Text className="text-white font-bold">Guardar boleta como imagen</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Boleta;
