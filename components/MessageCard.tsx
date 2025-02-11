import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { deleteMessage } from "@/services/chatServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { createChatRoomId } from "@/utils/common";
import * as ContextMenu from "zeego/context-menu";

type Props = {
  senderId: string;
  message: string;
  time: string;
  userId: string;
  messageId: string;
};

const MessageCard = ({ senderId, message, time, userId, messageId }: Props) => {
  const { user, receiverId } = useGlobalContext();
  const chatId =
    user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";

  const handleDeleteMessage = async () => {
    const res = await deleteMessage(
      chatId,
      user?.uid || "",
      receiverId || "",
      messageId || ""
    );
    if (res) Alert.alert("Message Deleted Successfully");
    else Alert.alert("Unauthorized to Delete the Message");
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Pressable
            className={`max-w-72 ${
              senderId === userId ? "self-end" : "self-start"
            }`}
            onLongPress={() => {}}
          >
            <View>
              <Text
                className={`text-white text-[1.1rem] rounded-xl p-3 ${
                  senderId === userId ? "bg-[#94b781]" : "bg-[#4f514e]"
                }`}
              >
                {message}
              </Text>
              <Text
                className={`text-white text-xs ${
                  senderId === userId ? "self-end pe-1" : "self-start ps-1"
                }`}
              >
                {time}
              </Text>
            </View>
          </Pressable>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item key="delete" onSelect={handleDeleteMessage}>
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </>
  );
};

export default MessageCard;
