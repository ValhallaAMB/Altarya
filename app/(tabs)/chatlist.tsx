import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/components/MessageCard";
import CustomModal from "@/components/CustomModal";
import { useGlobalContext } from "@/context/GlobalContext";
import { retrieveChatLists } from "@/services/chatListServices";

const ChatList = () => {
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const { user } = useGlobalContext();

  useEffect(() => {
    let unSub: (() => void) | undefined;

    const fetchData = async () => {
      unSub = await retrieveChatLists(user, setChats);
    };

    fetchData();

    return () => {
      if (unSub) unSub();
    };
  }, [user?.uid]);

  return (
    <SafeAreaView className="bg-[#001220] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="top-4 left-3">
          <View className="flex-row items-center w-full py-2">
            <Text className="text-5xl font-bold text-white ml-3">Chats</Text>

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
          {chats.map((chat) => (
            <MessageCard
              key={chat.chatId}
              receiverId={chat.chatId}
              title={chat.user.username}
              message={chat.lastMessage}
              time={new Date(chat.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatList;
