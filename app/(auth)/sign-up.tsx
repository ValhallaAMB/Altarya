import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/services/authServices";

const SignUp = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    username: string;
  }>({
    email: "",
    password: "",
    username: "",
  });

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpHandler = async () => {
    if (!form.email || !form.password || !form.username) {
      // setIsSubmitting(true);
      Alert.alert("Please fill in all fields");
      return;
    }
    // setIsSubmitting(true);
    let response = await createUser({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (response.success) {
      setForm({
        email: "",
        password: "",
        username: "",
      });
      console.log("Signed up");
      // setIsSubmitting(false);
      // router.push("/sign-in");
      router.push("/(tabs)/chatlist");
    } else {
      // setIsSubmitting(false);
      Alert.alert("Sign up", response.msg);
      // console.log("Error signing up", response.error.code, response.error.message);
    }
  };

  return (
    <SafeAreaView className="bg-[#161616] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4">
          <Text className="text-4xl font-bold text-blue-500">Altarya</Text>
          <Text className="text-2xl font-bold text-white mt-2">
            Log in using your email
          </Text>

          <FormField
            title="Username"
            value={form.username}
            placeholder="username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            autoCapitalize="none"
            extraStyles="mb-5 mt-6"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="xxx@xxx.xxx"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            autoCapitalize="none"
            extraStyles="mb-5"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            extraStyles="mb-6"
          />

          <CustomButton
            title="Sign Up"
            handlePress={signUpHandler}
            // isLoading={isSubmitting}
            containerStyle="w-[260]"
          />

          <View className="justify-center flex-row mt-4">
            <Text className="text-white">Have an account already? </Text>
            <Link href="/sign-in" className="text-blue-500 font-bold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
