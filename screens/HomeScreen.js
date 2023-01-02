import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";

const HomeScreen = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="p-5">
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://icons-for-free.com/iconfiles/png/512/uber-1324440247504689178.png",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
