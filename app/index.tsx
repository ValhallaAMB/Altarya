// import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-[#001220]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4 ">
          <Text className="text-2xl font-bold text-white">Welcome to</Text>
          <Text className="text-4xl font-bold text-[#94b781]">Altarya</Text>

          <Text className="mt-3 text-lg text-white">
            A chat application for everyone
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            containerStyle="mt-7 w-[260] bg-[#d5db95]"
            textStyle=""
            // containerStyle={{ marginTop: 28, width: "100%" }}
            // textStyle={{ fontSize: 20, fontWeight: "bold" }}
            // isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
