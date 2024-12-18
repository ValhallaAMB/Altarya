import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageCard from "@/components/MessageCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Chats = () => {
  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="top-4 left-3">
          <Text className="text-5xl font-bold text-white">
            Chats
          </Text>
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;
