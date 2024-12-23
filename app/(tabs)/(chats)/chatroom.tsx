import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //error lines might disappear once we connect the chat to the database
    setMessages([
      {
        _id: 1,
        text: "Hello loser >:)",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SP",
          avatar: "",
        },
      },
    ]);
  }, []);

  const onSend = (messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <View className="flex-1">
        <GiftedChat
          messages={messages}
          //error might disappear once we connect the chat to the database, for now every message is sent locally
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chatroom;
