import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/base";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];

const NavFavorites = () => {
  return (
    <View>
      <Text className="relative font-semibold text-2xl px-3 py-3">
        Favorite places:
      </Text>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => (
          <View className="bg-gray-200" style={{ height: 2 }} />
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { location, destination, icon } }) => (
          <TouchableOpacity className="flex-row items-center p-1">
            <Icon
              className="mr-4 rounded-full p-3"
              name={icon}
              color="#d3d3d3"
              size={18}
              type="ionicon"
              reverse
            />
            <View>
              <Text className="font-semibold text-lg">{location}</Text>
              <Text className="text-gray-500">{destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
