import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    title: "Get a Ride",
    image: "https://cdn3.iconfinder.com/data/icons/travel-emoji/50/Car-512.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046791.png",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-2xl"
        >
          <View>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{
                uri: item.image,
              }}
            />
            <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
            <Icon
              name="arrowright"
              color="black"
              type="antdesign"
              reverse
              size={18}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
