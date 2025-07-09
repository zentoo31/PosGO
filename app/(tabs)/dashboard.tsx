import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { Area, CartesianChart } from 'victory-native';


const dashboard = () => {

  const DATA = [
    { x: "Ene", y: 10 },
    { x: "Feb", y: 20 },
    { x: "Mar", y: 15 },
    { x: "Abr", y: 25 },
    { x: "May", y: 18 },
    { x: "Jun", y: 30 },
  ];

  const DATA2 = [
    { label: "Ventas", value: 40, color: "#FF6384" },
    { label: "Gastos", value: 25, color: "#36A2EB" },
    { label: "Marketing", value: 15, color: "#FFCE56" },
    { label: "Otros", value: 20, color: "#4BC0C0" }
  ];

  const ventasData = [
    { mes: 'Ene', ventas: 45000, x: 1, y: 45000 },
    { mes: 'Feb', ventas: 52000, x: 2, y: 52000 },
    { mes: 'Mar', ventas: 48000, x: 3, y: 48000 },
    { mes: 'Abr', ventas: 61000, x: 4, y: 61000 },
    { mes: 'May', ventas: 58000, x: 5, y: 58000 },
    { mes: 'Jun', ventas: 67000, x: 6, y: 67000 }
  ];


  return (
    <SafeAreaView className='flex-1 bg-[#16429E]'>
      <StatusBar backgroundColor="#16429E" barStyle="light-content" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
          <View className='flex-row items-center justify-center px-4 py-4'>
            <Text className='text-2xl font-bold text-white'>Dashboard</Text>
          </View>
        </View>

        <View className='bg-[#F9FAFB] px-4 pt-6 flex-1 '>
          <View className='shadow-lg border-[0.5px] border-gray-300 rounded-md bg-white flex-1'>
            <Text>dashboard</Text>
            <View style={{ height: 250 }}>
              <CartesianChart
                data={ventasData}
                xKey="x"
                yKeys={["y"]}
              >
                {({ points, chartBounds }) => (
                  <Area
                    points={points.y}
                    color="#2196F3"
                    opacity={0.6}
                    y0={0}
                  />
                )}
              </CartesianChart>
            </View>
          </View>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default dashboard