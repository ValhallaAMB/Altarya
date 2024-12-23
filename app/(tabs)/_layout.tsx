import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "yellow",
          tabBarInactiveTintColor: "gray",
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: "#161616",
            borderTopColor: "#333333",
            borderTopWidth: 1,
            height: Platform.OS === "ios" ? 80 : 70,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="chatlist"
          options={{
            title: "Chats",
            // tabBarIcon is a function that returns a React.Node from React
            // color and focused are props determined by `screenOptions={}` in the `Tabs` component
            tabBarIcon: ({ color, focused }) => {
              return (
                <Ionicons
                  size={28}
                  name={focused ? "chatbox" : "chatbox-outline"}
                  color={color}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => {
              return (
                <Ionicons
                  size={28}
                  name={focused ? "person-circle" : "person-circle-outline"}
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  );
};

export default TabsLayout;
