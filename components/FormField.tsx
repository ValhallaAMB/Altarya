import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  title: string;
  value: string;
  extraStyles?: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  keyboardType?: "email-address" | "default";
  showPassword?: boolean;
  setShowPassword?: (e: boolean) => void;
};

const FormField = ({
  title,
  value,
  extraStyles,
  placeholder,
  handleChangeText,
  keyboardType,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`gap-y-3 ${extraStyles}`}>
      <Text className="text-lg text-white ms-1">{title}</Text>
      <View className="items-center flex flex-row w-full h-16 px-5 rounded-lg bg-slate-800 border-2 border-blue-600 ">
        <TextInput
          className="flex-1 text-white"
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={handleChangeText}
          placeholderTextColor={"#8c8c8c"}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="white"
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
    </View>
  );
};

export default FormField;