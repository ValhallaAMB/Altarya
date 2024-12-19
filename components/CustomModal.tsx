import React from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  title?: string;
  modelTitle: string;
  value: string;
  modalStyles?: string;
  placeholder?: string;
  modalVisible: boolean;
  handleChangeText: (e: string) => void;
  modalDisplayFalse: () => void;
  modalDisplayTrue: () => void;
  useIcon: boolean;
  iconType?: string;
};

const CustomModal = ({
  title,
  modelTitle,
  value,
  modalStyles,
  placeholder,
  modalVisible,
  handleChangeText,
  modalDisplayFalse,
  modalDisplayTrue,
  useIcon,
  iconType,
}: Props) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalDisplayFalse}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-center items-center bg-black/70"
        >
          <View className="bg-[#161616] w-[90%] p-5 rounded-lg">
            <Text className="text-white text-lg font-semibold mb-4">
              {modelTitle}
            </Text>

            <TextInput
              className="bg-gray-800 text-white p-4 rounded-md"
              value={value}
              placeholder={placeholder}
              onChangeText={handleChangeText}
              placeholderTextColor="#8c8c8c"
            />

            <View className="flex-row justify-end mt-4">
              <Pressable
                className="px-4 py-2 bg-blue-600 rounded-md mr-2"
                onPress={modalDisplayFalse}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="px-4 py-2 bg-green-600 rounded-md"
                onPress={() => {
                  console.log("Add button clicked:", value);
                  modalDisplayFalse();
                }}
              >
                <Text className="text-white font-semibold">Add</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {useIcon ? (
        <Pressable onPress={modalDisplayTrue}>
          <Ionicons name={iconType as any} size={28} color="white" />
        </Pressable>
      ) : (
        <Pressable onPress={modalDisplayTrue}>
          <Text className="text-white">{title}</Text>
        </Pressable>
      )}
    </>
  );
};

export default CustomModal;
