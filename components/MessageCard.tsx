import { View, Text, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import PopupModal from "./sub_components/PopupModal";

type Props = {
  senderId: string;
  message: string;
  time: string;
  userId: string;
};

const MessageCard = ({ senderId, message, time, userId }: Props) => {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const pressableRef = useRef<View | null>(null);

  const handleLongPress = () => {
    if (pressableRef.current) {
      pressableRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Save the top and left positions of the pressable
        setModalPosition({ top: pageY + height, left: pageX });
        setIsOptionsVisible(true);
      });
    }
  };

  const closeOptions = () => {
    setIsOptionsVisible(false);
  };

  return (
    <>
      <Pressable
        className={`max-w-72 ${
          senderId === userId ? "self-end" : "self-start"
        }`}
        ref={pressableRef}
        onLongPress={handleLongPress}
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

      <PopupModal
        title={message}
        isOptionsVisible={isOptionsVisible}
        closeOptions={closeOptions}
        modalPosition={modalPosition}
        popupType="Message"
      />
    </>
  );
};

export default MessageCard;
