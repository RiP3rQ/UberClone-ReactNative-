import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import About from "../components/RestaurantDetail/About";
import { Divider, Icon } from "@rneui/themed";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import { useNavigation } from "@react-navigation/native";
import ViewCart from "../components/RestaurantDetail/ViewCart";

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
    price: "$14.50",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      {/* GO BACK BUTTON */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EatsScreen");
        }}
        className="absolute top-9 left-3 z-50 p-1 rounded-full bg-slate-100/30"
      >
        <Icon name="chevron-left" size={32} />
      </TouchableOpacity>
      {/* END GO BACK BUTTON */}

      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {foods.map((foods, index) => (
          <MenuItems foods={foods} key={index} />
        ))}
      </ScrollView>
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>
  );
};

export default RestaurantScreen;
