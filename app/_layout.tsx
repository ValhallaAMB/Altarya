import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from 'react-native'

// Import your global CSS file
import "../global.css";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chatroom" options={{ 
          // statusBarStyle:'inverted',
          title: '',
          headerShown: true,
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#001220',
          },
          headerTintColor: '#94b781',
          headerTitle: () => (
            <View>
            <Text className="text-xl font-bold text-gray-50">LeSpodsay</Text>
            </View>
          ),
         }} />
      </Stack>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  );
}
