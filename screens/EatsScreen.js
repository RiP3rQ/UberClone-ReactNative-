import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTabs from "../components/HeaderTabs";
import SearchRestaurants from "../components/SearchRestaurants";
import FoodCategories from "../components/FoodCategories";

const EatsScreen = () => {
  return (
    <View className="bg-white flex-1 h-full">
      <View className="mt-10 p-3">
        <HeaderTabs />
        <SearchRestaurants />
      </View>
      <FoodCategories />
    </View>
  );
};

export default EatsScreen;
