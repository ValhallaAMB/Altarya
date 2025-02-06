import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
  Time,
} from "react-native-gifted-chat";
import Ionicons from "@expo/vector-icons/Ionicons";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    //error lines might disappear once we connect the chat to the database
    setMessages([
      {
        _id: 1,
        text: "Hello loser >:)",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Lespodsay",
          avatar: "",
        },
      },

      {
        _id: 0,
        system: true,
        text: "This chat is being saved in our databases.",
      },
    ]);
  }, []);

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <SafeAreaView className="bg-[#262d36] h-full">
        <View className="flex-1">
          <GiftedChat
            messages={messages}
            //error might disappear once we connect the chat to the database, for now every message is sent locally
            onSend={(messages: any) => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderTime={(props) => (
              <Time
                {...props}
                timeTextStyle={{
                  left: {
                    color: "black",
                  },
                  right: {
                    color: "white",
                  },
                }}
              />
            )}
            onInputTextChanged={setText}
            renderSystemMessage={(props) => {
              return (
                <SystemMessage
                  {...props}
                  textStyle={{
                    color: "white",
                    fontSize: 13,
                    backgroundColor: "#306c60",
                    padding: 15,
                    borderRadius: 15,
                  }}
                />
              );
            }}
            renderAvatar={null}
            maxComposerHeight={100}
            renderBubble={(props) => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    left: {
                      backgroundColor: "#e3e8af",
                    },
                    right: {
                      backgroundColor: "#94b781",
                    },
                  }}
                />
              );
            }}
            textInputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#cbd5e1",
                paddingHorizontal: 10,
                fontSize: 16,
                marginVertical: 10,
                paddingTop: 8,
                paddingBottom: 8,
                flex: 1,
                marginLeft: 8,
              },
            }}
            renderInputToolbar={(props) => (
              <InputToolbar
                {...props}
                containerStyle={{
                  backgroundColor: "#f3f4f6",
                }}
              />
            )}
            renderSend={(props) => (
              <View className="px-3 pb-2">
                {text.length > 0 && (
                  <Send
                    {...props}
                    containerStyle={{ justifyContent: "center" }}
                  >
                    <Ionicons name="send" color={"#94b781"} size={28} />
                  </Send>
                )}
              </View>
            )}
          />
        </View>
    </SafeAreaView>
  );
};

export default Chatroom;
