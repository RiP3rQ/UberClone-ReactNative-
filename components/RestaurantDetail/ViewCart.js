import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ViewCart = () => {
  return (
    <View className="flex-1 items-center justify-center flex-row absolute bottom-2 z-50">
      <View className="flex-row justify-center w-full">
        <TouchableOpacity className="relative w-72 rounded-3xl p-3 items-center bg-black mt-5">
          <Text className="text-white text-xl">View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewCart;
