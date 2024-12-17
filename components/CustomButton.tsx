import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  handlePress: () => void;
  containerStyle?: string; // Tailwind class names
  textStyle?: string; // Tailwind class names
  isLoading: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyle = "",
  textStyle = "",
  isLoading,
}: Props) => {
  return (
    <Pressable
      onPress={handlePress}
      disabled={isLoading}
      className={`py-4 rounded-lg items-center justify-center active:opacity-85 bg-slate-200 ${containerStyle}`}
    >
      <Text className={`text-xl font-bold ${textStyle}`}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
