import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/components/MessageCard";
import CustomModal from "@/components/CustomModal";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";
import { retrieveChatLists } from "@/services/chatListServices";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ChatList = () => {
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const { user } = useGlobalContext();

  useEffect(() => {
    // retrieveChatLists(user)
    if (!user) return;

    const unSub = onSnapshot(
      doc(db, "userchatrooms", user?.uid),
      async (res) => {
        const items = res.data()?.chats;
        console.log("items", items);

        const promises = items.map(async (item: any) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          console.log("user", user);

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        console.log("chatData", chatData);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [user?.uid]);

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
          <TouchableOpacity onPress={() => router.push("/chatroom")}>
            {chats.map((chat) => (
              <MessageCard
                key={chat.chatId}
                title={chat.user.username}
                message={chat.lastMessage}
                time={new Date(chat.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            ))}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatList;
