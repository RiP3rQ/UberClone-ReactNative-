import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const RestaurantItem = ({ restaurantData }) => {
  const navigation = useNavigation();
  return (
    <>
      {restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          onPress={() =>
            navigation.navigate("RestaurantScreen", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          <View className="mt-2 p-4 bg-white">
            <RestaurantImage
              image={
                restaurant.image_url
                  ? restaurant.image_url
                  : "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg"
              }
            />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RestaurantItem;

const RestaurantImage = ({ image }) => (
  <View className="relative">
    <Image
      style={{
        width: "100%",
        height: 180,
      }}
      source={{
        uri: image,
      }}
    />
    <TouchableOpacity className="absolute top-2 right-2">
      <MaterialCommunityIcons name="heart-outline" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

const RestaurantInfo = ({ name, rating }) => (
  <View className="flex-row justify-between items-center mt-2">
    <View>
      <Text style={{ fontSize: 18 }} className="font-bold">
        {name}
      </Text>
      <Text style={{ fontSize: 13 }} className="text-gray-500">
        {Math.floor(Math.random() * (30 - 15 + 1) + 15)} -{" "}
        {Math.floor(Math.random() * (60 - 31 + 1) + 31)} minutes
      </Text>
    </View>
    <View className="bg-[#a5a0a0] h-8 w-8 items-center justify-center rounded-full">
      <Text className="text-white">{rating}</Text>
    </View>
  </View>
);
