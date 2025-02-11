import { useGlobalContext } from "@/context/GlobalContext";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import * as ContextMenu from "zeego/context-menu";
import { createChatRoomId } from "@/utils/common";
import { deleteChatRoom } from "@/services/chatListServices";

type Props = {
  receiverId: string;
  title: string;
  message: string;
  time: string;
};

const ChatRoomCard = ({ receiverId, title, message, time }: Props) => {
  const { setChatroomParams, user } = useGlobalContext();
  const chatId =
    user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";

  // console.log("messageId", messageId);

  const handleDeleteChatRoom = async () => {
    const res = await deleteChatRoom(chatId, user?.uid || "", receiverId || "");
    if (res) Alert.alert("Chat Room Deleted Successfully");
    else Alert.alert("Error Deleting Chat Room");
  };

  const toChatroom = () => {
    // console.log("Pressable clicked:", receiverId, title);
    setChatroomParams(receiverId, title);
    router.push("/chatroom");
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          {/* Main Card */}
          <Pressable
            className="flex-row items-center w-full py-2"
            // ref={pressableRef}
            onLongPress={() => {}}
            onPress={toChatroom}
          >
            <View className="h-16 w-16 p-1 ms-1">
              <Image
                source={require("../assets/images/defaultProfilePicture.jpg")}
                className="w-[50px] h-[50px] rounded-full"
              />
            </View>

            <View className="ms-4 flex-1">
              <Text className="text-white text-base font-semibold capitalize">
                {title}
              </Text>
              <Text
                className="text-gray-400 text-sm"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {message}
              </Text>
            </View>

            <View className="me-2">
              <Text className="text-[#d5db95] text-base font-semibold px-4">
                {time}
              </Text>
            </View>
          </Pressable>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item key="delete" onSelect={handleDeleteChatRoom}>
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <View className="w-1/2 self-center border-b border-gray-400 rounded-full mt-1" />
    </>
  );
};

export default ChatRoomCard;
