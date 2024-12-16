import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

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
            // borderTopColor: "red",
            borderTopWidth: 1,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="chats"
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
          name="group-chats"
          options={{
            title: "Group Chats",
            tabBarIcon: ({ color, focused }) => {
              return (
                <Ionicons
                  size={28}
                  name={focused ? "chatbubbles" : "chatbubbles-outline"}
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
    </>
  );
};

export default TabsLayout;
