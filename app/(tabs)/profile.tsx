import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';

const defualtProfileImage = require('../../assets/images/defaultProfilePicture.jpg');


const Profile = () => {
  //undefined if the user does not select an image
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const pickImageAsync = async () => {
    // Request permission to access the device's media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
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
        <View className="items-center justify-top w-full px-4 mt-6 ">
          <Text className="text-3xl font-bold text-blue-500">Edit Profile</Text>
          <Text className="text-xl font-regular text-white mt-2 align-center">
            Edit your profile details
          </Text>
        </View>

        <View className="align-center items-center justify-center">
          <Image
            source={selectedImage ? { uri: selectedImage } : defualtProfileImage}
            className="w-[100px] h-[100px] mt-6 rounded-full"
          />

          {/* <TouchableOpacity onPress={pickImageAsync}>
            <Text className="text-white py-2 px-4">Edit</Text>
          </TouchableOpacity> */}

          <CustomButton
            title={'Edit'}
            handlePress={pickImageAsync}
            isLoading={false}
            textStyle="text-white text-md"
            containerStyle="mt-5 py-1 px-4 bg-transparent"
          />
        </View>

        <FormField
          title={'Username'}
          value={username}
          handleChangeText={(newUsername) => setUsername(newUsername)}
          extraStyles='mx-5 my-3'
        />

        <FormField
          title={'Email'}
          value={email}
          handleChangeText={(newEmail) => setEmail(newEmail)}
          extraStyles='mx-5 my-3'
        />

        <View>
        <CustomButton
          title={'Save'}
          handlePress={ function (): void {throw new Error('Function not implemented.');} } 
          isLoading={false}  
          textStyle="text-white text-md"
          containerStyle="mt-10 mx-5 py-[10px] bg-blue-600"        
          />
        </View>

        {/* <View className="items-left justify-top px-4 mt-2  mx-4">

          <TextInput
            className="bg-white text-black mt-10 py-3 px-2 rounded-2xl"
            autoCorrect={false}
            autoCapitalize="none"
            value={username}
            onChangeText={(newUsername) => setUsername(newUsername)}
          
          />

          <TextInput
            className="bg-white text-black my-10 py-3 px-2 rounded-2xl"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
          
          />
      
        </View> */}

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile