import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { listenToMessages, sendMessage } from "@/services/chatServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { DocumentData } from "firebase/firestore";
import { createChatRoomId } from "@/utils/common";
import CustomKeyboard from "@/components/CustomKeyboard";

const Chatroom = () => {
  const [text, setText] = useState("");
  const [chats, setChats] = useState<DocumentData | undefined>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { user, receiverId } = useGlobalContext();
  const chatId =
    user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";

  useEffect(() => {
    let unSub: (() => void) | undefined;

    const fetchData = async () => {
      unSub = listenToMessages(chatId, setChats);
    };

    fetchData();

    return () => {
      if (unSub) unSub();
      // console.log("chats", chats);
    };
  }, [chatId]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;
    sendMessage(chatId, user?.uid || "", receiverId || "", text);
    setText("");
  };

  return (
    <SafeAreaView className="bg-[#001220] flex-1">
      <ScrollView className="bg-[#262d36]" ref={scrollViewRef}>
        <View className="p-3 gap-2">
          {chats?.messages?.map((message: any, index: number) => (
            <View
              key={index}
              className={`max-w-72 ${
                message.senderId === user?.uid ? "self-end" : "self-start"
              }`}
            >
              <View>
                <Text
                  className={`text-white text-[1.1rem] rounded-xl p-3 ${
                    message.senderId === user?.uid
                      ? "bg-[#94b781]"
                      : "bg-[#4f514e]"
                  }`}
                >
                  {message.text}
                </Text>
                <Text
                  className={`text-white text-xs ${
                    message.senderId === user?.uid
                      ? "self-end pe-1"
                      : "self-start ps-1"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <CustomKeyboard
        text={text}
        setText={setText}
        handleSendMessage={handleSendMessage}
      />
    </SafeAreaView>
  );
};

export default Chatroom;
