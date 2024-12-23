import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { logIn } from "@/services/authServices";

const SignUp = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    // Login logic
    const response = await logIn({
      email: form.email,
      password: form.password,
    });

    if (!response.success) {
      Alert.alert("Sign in", response.msg);
      return;
    }

    setForm({
      email: "",
      password: "",
    });
    router.push("/(tabs)/chatlist");
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
            title="Email"
            value={form.email}
            placeholder="xxx@xxx.xxx"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            extraStyles="mb-5 mt-6"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            extraStyles="mb-6"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            // isLoading={isSubmitting}
            containerStyle="w-[260]"
          />

          <View className="justify-center flex-row mt-4">
            <Text className="text-white">Don't have an account? </Text>
            <Link href="/sign-up" className="text-blue-500 font-bold">
              Sign Up
            </Link>
          </View>

          <TouchableOpacity
            className="justify-center flex-row mt-4"
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Text className="text-white">Click to go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center flex-row mt-4"
            onPress={() => router.push("/chatroom")}
          >
            <Text className="text-white">Click to go to a chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
