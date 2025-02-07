// filepath: /c:/Users/Valhalla/Desktop/Altarya/app/(chatroom)/chatroom.tsx
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { listenToMessages, sendMessage } from "@/services/chatServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { DocumentData } from "firebase/firestore";
import { createChatRoomId } from "@/utils/common";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user, receiverId } = useGlobalContext();
  const [chats, setChats] = useState<DocumentData | undefined>();
  const chatId =
    user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let unSub: (() => void) | undefined;

    const fetchData = async () => {
      unSub = listenToMessages(chatId, setChats);
    };

    fetchData();

    return () => {
      if (unSub) unSub();
      console.log("chats", chats);
    };
  }, [chatId]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

  // useEffect(() => {
  //   console.log("chats", chats);
  // }, [chats]);

  const handleSendMessage = () => {
    if (text.trim() === "") return;
    sendMessage(chatId, user?.uid || "", receiverId || "", text);
    setText("");
  };

  return (
    <SafeAreaView className="bg-[#001220] flex-1">
      <ScrollView className="bg-[#262d36]" ref={scrollViewRef}>
        <View className="p-4 gap-4">
          {chats?.messages?.map((message: any, index: number) => (
            <View
              key={index}
              className={`max-w-72 ${
                message.senderId === user?.uid ? "self-end" : "self-start"
              }`}
            >
              <View>
                <Text
                  className={`text-white text-md rounded-xl p-3 ${
                    message.senderId === user?.uid
                      ? "bg-[#94b781]"
                      : "bg-[#4f514e]"
                  }`}
                >
                  {message.text}
                </Text>
                <Text
                  className={`text-white text-xs ${
                    message.senderId === user?.uid ? "self-end pe-1" : "self-start ps-1"
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={98}
        className="pt-3"
      >
        <View className="flex-row max-h-[100px] px-3 gap-x-3">
          <TextInput
            className="flex-1 px-4 pb-3 text-white text-lg rounded-2xl border-2 border-[#bac0b6]"
            multiline
            value={text}
            placeholder={"Type a message..."}
            onChangeText={setText}
            placeholderTextColor={"#8c8c8c"}
          />
          <Pressable
            className="flex justify-center"
            onPress={() => handleSendMessage()}
          >
            <Ionicons name="send" color={"#94b781"} size={28} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chatroom;
