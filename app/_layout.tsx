import { router, Stack, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import GlobalContextProvider, {
  useGlobalContext,
} from "@/context/GlobalContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useGlobalContext();
  const segments = useSegments();

  useEffect(() => {
    // Check authentication
    const inApp = segments[0] == "(tabs)";

    if (isAuthenticated && !inApp) {
      // redirect user to home
      router.replace("/chatlist");
    } else if (!isAuthenticated) {
      // redirect user to sign in
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="chatroom" options={{ headerShown: false }} /> */}
      </Stack>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  );
};

export default function RootLayout() {
  return (
    <GlobalContextProvider>
      <MainLayout />
    </GlobalContextProvider>
  );
}
