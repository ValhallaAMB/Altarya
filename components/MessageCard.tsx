import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";

const MessageCard = () => {
  return (
    <>
      <Pressable className="flex-row items-center w-full py-2">
        <View className="h-16 w-16 p-1 ms-1">
          <Image
            source={require("../assets/images/defaultProfilePicture.jpg")}
            className="w-[50px] h-[50px] rounded-full"
          />
        </View>

        <View className="ms-4 flex-1">
          <Text className="text-white text-base font-semibold capitalize">
            Person's Name
          </Text>
          <Text
            className="text-gray-400 text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            ea voluptatem pariatur nemo! Culpa sed totam, aliquam commodi veniam
            accusantium rerum dignissimos laudantium quibusdam enim, magnam at
            doloribus porro debitis.
          </Text>
        </View>

        <View className="me-2">
          <Text className="text-blue-600 text-base font-semibold px-4">
            12:00 AM
          </Text>
        </View>
      </Pressable>
      <View className="w-1/2 self-center border-b border-gray-400 rounded-full mt-1" />
    </>
  );
};

export default MessageCard;
