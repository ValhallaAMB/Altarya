import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/components/MessageCard";
import CustomModal from "@/components/CustomModal";
import { router } from "expo-router";

const Chats = () => {
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="top-4 left-3">
          <View className="flex-row items-center w-full py-2">
            <Text className="text-5xl font-bold text-white">Chats</Text>
            
            <View className="ms-auto me-5">
              <CustomModal
                title="New Chat"
                modelTitle="Start a new chat"
                value={modalText}
                modalVisible={modalVisible}
                handleChangeText={(e: string) => setModalText(e)}
                modalDisplayFalse={() => setModalVisible(false)}
                modalDisplayTrue={() => setModalVisible(true)}
                useIcon={true}
                iconType="add-circle"
                placeholder="Enter username..."
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/chatroom')}>
            <MessageCard
              title={"Bob The Builder"}
              message={"Building this ???"}
              time={new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;
