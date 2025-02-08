import { View, Text, Modal, Pressable, Alert } from "react-native";
import React from "react";
import { deleteChatRoom } from "@/services/chatListServices";
import { useGlobalContext } from "@/context/GlobalContext";
import { createChatRoomId } from "@/utils/common";
import { deleteMessage } from "@/services/chatServices";

type Props = {
  title: string;
  isOptionsVisible: boolean;
  closeOptions: () => void;
  modalPosition: { top: number; left: number };
  popupType: "Message" | "ChatRoom";
  messageId: string;
};

const PopupModal = ({
  title,
  isOptionsVisible,
  closeOptions,
  modalPosition,
  popupType,
  messageId,
}: Props) => {
  const { user, receiverId } = useGlobalContext();
  const chatId =
    user?.uid && receiverId ? createChatRoomId(user.uid, receiverId) : "";

  const handleDeleteChatRoom = async () => {
    const res = await deleteChatRoom(chatId, user?.uid || "", receiverId || "");
    if (res) Alert.alert("Chat Room Deleted Successfully");
    else Alert.alert("Error Deleting Chat Room");
    closeOptions();
  };

  const handleDeleteMessage = async () => {
    const res = await deleteMessage(
      chatId,
      user?.uid || "",
      receiverId || "",
      messageId
    );
    if (res) Alert.alert("Message Deleted Successfully");
    else Alert.alert("Error Deleting Message");
    closeOptions();
  };

  return (
    <>
      {/* Modal for Dim Background */}
      <Modal
        transparent={true}
        visible={isOptionsVisible}
        animationType="fade"
        onRequestClose={closeOptions}
      >
        {/* Dimmed Background */}
        <Pressable onPress={closeOptions} className="bg-black/70 w-full h-full">
          {/* Position modal relative to pressable */}
          <View
            style={{
              position: "absolute",
              top: modalPosition.top,
              left: modalPosition.left,
            }}
            className="items-start max-w-72"
          >
            {/* Message bubble */}
            <View className="bg-[#94b781] p-2.5 rounded-xl mb-2 ">
              <Text className="text-white text-lg">{title}</Text>
            </View>

            {/* List of Options */}
            {popupType === "Message" && (
              <View className="bg-[#262d36] rounded-xl p-2.5">
                <Pressable onPress={() => console.log("Edit Pressed")}>
                  <Text className="text-white py-2.5 text-start">Edit</Text>
                </Pressable>

                <View className="h-px bg-gray-700" />

                <Pressable onPress={handleDeleteMessage}>
                  <Text className="text-red-600 py-2.5 text-start">Delete</Text>
                </Pressable>
              </View>
            )}
            {popupType === "ChatRoom" && (
              <View className="bg-[#262d36] rounded-xl p-2.5">
                <Pressable onPress={handleDeleteChatRoom}>
                  <Text className="text-red-600 py-2.5 text-start">Delete</Text>
                </Pressable>
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default PopupModal;
