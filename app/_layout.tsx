import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

// Import your global CSS file
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chatroom" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  );
}
