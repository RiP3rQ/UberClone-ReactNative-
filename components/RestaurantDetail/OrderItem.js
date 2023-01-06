import { View, Text } from "react-native";
import React from "react";

const OrderItem = ({ title, price }) => {
  return (
    <View className="flex-row justify-between p-5 border-b border-black">
      <Text className="text-base font-semibold">{title}</Text>
      <Text className="text-base opacity-70">{price}</Text>
    </View>
  );
};

export default OrderItem;
