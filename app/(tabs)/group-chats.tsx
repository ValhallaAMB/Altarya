import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/components/MessageCard";
import CustomModal from "@/components/CustomModal";

const GroupChats = () => {
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="top-4 left-3">
          <View className="flex-row items-center w-full py-2">
            <Text className="text-5xl font-bold text-white">Group Chats</Text>
            <View className="ms-auto me-5">
              <CustomModal
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

          <MessageCard />
          <MessageCard />
          <MessageCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupChats;
