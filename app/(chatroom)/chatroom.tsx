import { SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { listenToMessages, sendMessage } from "@/services/chatServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { DocumentData } from "firebase/firestore";
import { createChatRoomId } from "@/utils/common";
import CustomKeyboard from "@/components/CustomKeyboard";
import MessageCard from "@/components/MessageCard";

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
            <MessageCard
              key={index}
              senderId={message.senderId}
              message={message.text}
              time={new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              userId={user?.uid || ""}
              messageId={message._id}
            />
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
