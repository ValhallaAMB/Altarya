import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import {
  deleteAccount,
  logOut,
  updateAccount,
} from "@/services/profileServices";
import { useGlobalContext } from "@/context/GlobalContext";

const Profile = () => {
  const { user } = useGlobalContext();
  const [username, setUsername] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // console.log("user", user?.email);
  // console.log("username", user?.displayName);

  const resetInputFields = () => {
    setUsername(user?.displayName ?? "");
    setEmail(user?.email ?? "");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleUpdateProfile = async () => {
    if (!user || !username || !email || !currentPassword) {
      resetInputFields();
      return Alert.alert(
        "Fill in the required fields. \nCurrent password must be provided \nto update profile."
      );
    }
    const res = await updateAccount(
      user,
      username,
      email,
      currentPassword,
      newPassword
    );

    if (res.success) {
      resetInputFields();
      Alert.alert("Profile updated successfully");
    } else {
      Alert.alert("Error updating profile", res.msg);
    }
  };

  const handleDeleteAccount = async () => {
    // Delete account logic
    if (user) await deleteAccount(user);
  };

  const logOutHandler = async () => {
    await logOut();
  };

  return (
    <SafeAreaView className="bg-[#001220] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Text className="text-4xl font-bold text-[#d5db95] text-center mt-12">
          Edit Profile
        </Text>
        <Text className="text-lg font-regular text-white mt-2 text-center">
          Edit your profile details
        </Text>

        <FormField
          title={"Username"}
          value={username}
          handleChangeText={(newUsername) => setUsername(newUsername)}
          extraStyles="mx-5 my-3"
        />

        <FormField
          title={"Email"}
          value={email}
          handleChangeText={(newEmail) => setEmail(newEmail)}
          extraStyles="mx-5 my-3"
        />

        <FormField
          title={"Current Password"}
          value={currentPassword}
          handleChangeText={(currentPassword) =>
            setCurrentPassword(currentPassword)
          }
          extraStyles="mx-5 my-3"
        />

        <FormField
          title={"New Password"}
          value={newPassword}
          handleChangeText={(newPassword) => setNewPassword(newPassword)}
          extraStyles="mx-5 my-3"
        />

        <CustomButton
          title={"Update Profile"}
          handlePress={handleUpdateProfile}
          // isLoading={false}
          textStyle="text-black text-md"
          containerStyle="mt-10 mx-5 py-[10px] bg-[#d5db95]"
        />

        <CustomButton
          title={"Sign Out"}
          handlePress={logOutHandler}
          // isLoading={false}
          textStyle="text-black text-md"
          containerStyle="mt-10 mx-5 py-[10px] bg-[#d5db95]"
        />

        <CustomButton
          title={"Delete Account"}
          handlePress={handleDeleteAccount}
          // isLoading={false}
          textStyle="text-white text-md"
          containerStyle="mt-10 mx-5 py-[10px] bg-red-500"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
