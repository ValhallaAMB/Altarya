import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  findNodeHandle,
} from "react-native";

type Props = {
  title: string;
  message: string;
  time: string;
};

const MessageCard = ({ title, message, time }: Props) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
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
      {/* Main Card */}
      <Pressable
        onLongPress={handleLongPress}
        className="flex-row items-center w-full py-2"
        ref={pressableRef}
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
          <Text className="text-blue-600 text-base font-semibold px-4">
            {time}
          </Text>
        </View>
      </Pressable>

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
          >
            {/* Message bubble */}
            <View className="bg-[#4e8fde] p-2.5 rounded-xl my-2">
              <Text className="text-white text-lg">{title}</Text>
            </View>

            {/* List of Options */}
            <View className="bg-[#161616] rounded-xl p-2.5">
              <Pressable onPress={() => console.log("Edit Pressed")}>
                <Text className="text-white py-2.5 text-start">Edit</Text>
              </Pressable>
              <View className="h-px bg-gray-700" />
              <Pressable onPress={() => console.log("Delete Pressed")}>
                <Text className="text-red-600 py-2.5 text-start">Delete</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      <View className="w-1/2 self-center border-b border-gray-400 rounded-full mt-1" />
    </>
  );
};

export default MessageCard;
