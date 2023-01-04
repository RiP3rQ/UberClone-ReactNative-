import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const HeaderTabs = () => {
  const [activeTab, setActiveTab] = useState("Uber");

  return (
    <View className="flex-row self-center">
      <HeaderButton
        text="Uber Eats"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Uber"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

export default HeaderTabs;

const HeaderButton = (props) => (
  <TouchableOpacity
    className="py-2 px-4 rounded-3xl"
    style={{
      backgroundColor: props.activeTab === props.text ? "black" : "transparent",
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text style={{ color: props.activeTab === props.text ? "white" : "black" }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);