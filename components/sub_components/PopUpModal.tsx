import { View, Text, Modal, Pressable } from "react-native";
import React from "react";

type Props = {
  title: string;
  isOptionsVisible: boolean;
  closeOptions: () => void;
  modalPosition: { top: number; left: number };
};

const PopUpModal = ({
  title,
  isOptionsVisible,
  closeOptions,
  modalPosition,
}: Props) => {
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
            className="items-start"
          >
            {/* Message bubble */}
            <View className="bg-[#94b781] p-2.5 rounded-xl my-2">
              <Text className="text-white text-xl font-semibold">{title}</Text>
            </View>

            {/* List of Options */}
            <View className="bg-[#262d36] rounded-xl p-2.5">
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
    </>
  );
};

export default PopUpModal;
