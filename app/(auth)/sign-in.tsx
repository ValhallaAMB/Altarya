import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(form);
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
            isLoading={isSubmitting}
            containerStyle="w-[260]"
          />

          <View className="justify-center flex-row mt-4">
            <Text className="text-white">Don't have an account? </Text>
            <Link href="/sign-up" className="text-blue-500 font-bold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;