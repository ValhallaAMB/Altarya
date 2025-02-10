import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type CustomKeyboardProps = {
  text: string;
  setText: (text: string) => void;
  handleSendMessage: (text: string) => void;
};

const CustomKeyboard = ({
  text,
  setText,
  handleSendMessage,
}: CustomKeyboardProps) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={98}
        className="pt-3"
      >
        <View className="flex-row max-h-24 px-3 gap-x-3">
          <TextInput
            className="flex-1 px-4 py-1 text-white text-lg rounded-2xl border-2 border-[#bac0b6]"
            multiline
            value={text}
            placeholder={"Type a message..."}
            onChangeText={setText}
            placeholderTextColor={"#8c8c8c"}
          />
          <Pressable
            className="flex justify-center"
            onPress={() => handleSendMessage(text)}
          >
            <Ionicons name="send" color={"#94b781"} size={28} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomKeyboard;
