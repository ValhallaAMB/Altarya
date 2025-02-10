import { useGlobalContext } from "@/context/GlobalContext";
import { router } from "expo-router";
import React, { useState, useRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import PopupModal from "./sub_components/PopupModal";

type Props = {
  receiverId: string;
  title: string;
  message: string;
  time: string;
};

const ChatRoomCard = ({ receiverId, title, message, time }: Props) => {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const pressableRef = useRef<View | null>(null);
  const { setChatroomParams } = useGlobalContext();

  const handleLongPress = () => {
    if (pressableRef.current) {
      pressableRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Save the top and left positions of the pressable
        setModalPosition({ top: pageY + height, left: pageX });
        setIsOptionsVisible(true);
        setChatroomParams(receiverId, title);
        // console.log("Long Pressed:", receiverId, title);
      });
    }
  };

  const closeOptions = () => {
    setIsOptionsVisible(false);
  };

  const toChatroom = () => {
    // console.log("Pressable clicked:", receiverId, title);
    setChatroomParams(receiverId, title);
    router.push("/chatroom");
  };

  return (
    <>
      {/* Main Card */}
      <Pressable
        className="flex-row items-center w-full py-2"
        ref={pressableRef}
        onLongPress={handleLongPress}
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

      <PopupModal
        title={title}
        isOptionsVisible={isOptionsVisible}
        closeOptions={closeOptions}
        modalPosition={modalPosition}
        popupType="ChatRoom"
      />

      <View className="w-1/2 self-center border-b border-gray-400 rounded-full mt-1" />
    </>
  );
};

export default ChatRoomCard;
