import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTabs from "../components/HeaderTabs";
import SearchRestaurants from "../components/SearchRestaurants";

const EatsScreen = () => {
  return (
    <View className="bg-white flex-1 h-full">
      <View className="mt-6 p-3">
        <HeaderTabs />
        <SearchRestaurants />
      </View>
    </View>
  );
};

export default EatsScreen;
