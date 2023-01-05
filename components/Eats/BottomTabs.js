import { View, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const BottomTabs = () => {
  return (
    <View className="flex-row m-2 mx-7 justify-between">
      <IconComponent name="home" text="Home" />
      <IconComponent name="search" text="Browse" />
      <IconComponent name="shopping-bag" text="Grocery" />
      <IconComponent name="receipt" text="Orders" />
      <IconComponent name="user" text="Account" />
    </View>
  );
};

export default BottomTabs;

const IconComponent = ({ name, text }) => (
  <View>
    <Icon
      type="font-awesome-5"
      name={name}
      size={20}
      className="self-center mb-1"
    />
    <Text className="">{text}</Text>
  </View>
);
