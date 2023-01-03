import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://cdn-icons-png.flaticon.com/512/575/575684.png",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image:
      "https://img.freepik.com/premium-vector/car-icon-vector-illustration-black-editable-vector_685751-2.jpg?w=2000",
  },
];

// if we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <View className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View className="-ml-4 ">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text className="text-xl">$99</Text>
          </TouchableOpacity>
        )}
      />

      <View className="-mt-10 items-center">
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-3 m-3 rounded-full w-64 ${
            !selected && "bg-gray-300"
          }`}
        >
          <Text className="text-center text-white text-xl">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;
