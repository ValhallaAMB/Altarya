import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createChatRoom, searchUser } from "@/services/userChatRoomsServices";
import { useGlobalContext } from "@/context/GlobalContext";

type Props = {
  title?: string;
  modelTitle: string;
  value: string;
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
  placeholder,
  modalVisible,
  handleChangeText,
  modalDisplayFalse,
  modalDisplayTrue,
  useIcon,
  iconType,
}: Props) => {
  const [foundUser, setFoundUser] = useState<boolean>(false);
  const [searchedUserId, setSearchedUserId] = useState<string>("");

  const { user } = useGlobalContext();

  const handleSearch = async () => {
    if (!value) {
      Alert.alert("Please fill in the field before searching");
    }

    let response = await searchUser(value);
    // console.log("response", response);
    if (response) {
      // console.log("User found");
      setSearchedUserId(response.userId);
      setFoundUser(true);
    } else {
      // console.log("User not found");
      Alert.alert("User not found");
      setSearchedUserId("null");
      setFoundUser(false);
    }
  };

  const handleAdd = async () => {
    let res = await createChatRoom(searchedUserId, user);
    if (res.success) {
      Alert.alert("Chat room created");
      modalDisplayFalse();
      handleChangeText("");
      setFoundUser(false);
    } else {
      Alert.alert(res.msg || "An error occurred");
      setFoundUser(false);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalDisplayFalse}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center bg-black/70"
        >
          <View className="bg-[#001220] w-[80%] p-5 rounded-2xl">
            <Text className="text-white text-lg font-semibold mb-4">
              {modelTitle}
            </Text>

            <TextInput
              className="bg-[#262d36] text-white p-4 rounded-md"
              value={value}
              placeholder={placeholder}
              autoCapitalize="none"
              onChangeText={handleChangeText}
              placeholderTextColor="#8c8c8c"
            />

            <View className="flex-row justify-end mt-4">
              <Pressable className="px-4 py-2 me-2" onPress={modalDisplayFalse}>
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="px-4 py-2 bg-blue-950 rounded-xl"
                onPress={handleSearch}
              >
                <Text className="text-white font-semibold">Search</Text>
              </Pressable>
            </View>

            {foundUser && (
              <View className="flex-row justify-between mt-4">
                <Text className="text-white text-lg font-semibold ps-2">
                  {value}
                </Text>
                <Pressable
                  className="px-4 py-2 bg-[#94b781] rounded-xl"
                  onPress={handleAdd}
                >
                  <Text className="text-white font-semibold">Add</Text>
                </Pressable>
                {/* <Pressable
                  className="px-4 py-2 bg-green-600 rounded-xl"
                  onPress={handleAdd}
                >
                  <Text className="text-white font-semibold">Add</Text>
                </Pressable> */}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {useIcon ? (
        <Pressable onPress={modalDisplayTrue}>
          <Ionicons name={iconType as any} size={28} color="#94b781" />
        </Pressable>
      ) : (
        <Pressable
          className="px-4 py-2 bg-blue-950 rounded-xl"
          onPress={modalDisplayTrue}
        >
          <Text className="text-white font-semibold">{title}</Text>
        </Pressable>
      )}
    </>
  );
};

export default CustomModal;
