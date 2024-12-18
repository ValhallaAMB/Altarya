import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

const defualtProfileImage = require('../../assets/images/defaultProfilePicture.jpg');


const Profile = () => {
  //undefined if the user does not select an image
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert("You did not select an image.");
      console.log(result);
    }
  };

  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-top w-full px-4 mt-6">
          <Text className="text-3xl font-bold text-blue-500">Edit Profile</Text>
          <Text className="text-xl font-regular text-white mt-2 align-center">
            Edit your profile details
          </Text>
        </View>

        <View className="align-center items-center justify-center">
          <Image
            source={selectedImage ? { uri: selectedImage } : defualtProfileImage }
            className="w-[100px] h-[100px] mt-6 rounded-full"
            
          />
          <TouchableOpacity onPress={pickImageAsync}>
            <Text className="text-white py-2 px-4">Edit</Text>
          </TouchableOpacity>
        </View>


        <View className="items-left justify-top px-4 mt-2  mx-4">

          <TextInput 
            className="bg-white text-black mt-10 py-3 px-2 rounded-2xl"
            autoCorrect={false}
            autoCapitalize="words"
            value={username}
            onChangeText={(newUsername) => setUsername(newUsername)}
            // style={{borderColor: "black", borderWidth: 1, }}
          />
          
          <TextInput 
            className="bg-white text-black my-10 py-3 px-2 rounded-2xl"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
            // style={{borderColor: "", borderWidth: 1,  }}
          />
          {/* <Text className="text-white py-10">Tagline</Text> */}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile