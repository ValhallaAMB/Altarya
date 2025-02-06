import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "@/context/GlobalContext";

const ChatroomLayout = () => {
  const { receiverUsername, receiverId } = useGlobalContext();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="chatroom"
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#001220",
            },
            headerLeft: () => (
              <View>
                <Pressable
                  className="flex-row items-center"
                  onPress={() => router.back()}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={28}
                    color="#f9fafb"
                  />
                  {/* <Text className="text-xl font-bold text-gray-50">Back</Text> */}
                </Pressable>
              </View>
            ),
            headerTitle: () => (
              <View>
                <Text className="text-xl font-bold text-gray-50">
                  {receiverUsername} 
                </Text>
              </View>
            ),
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  );
};

export default ChatroomLayout;
