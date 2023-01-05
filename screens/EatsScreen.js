import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/Eats/HeaderTabs";
import SearchRestaurants from "../components/Eats/SearchRestaurants";
import FoodCategories from "../components/Eats/FoodCategories";
import RestaurantItem from "../components/Eats/RestaurantItem";
import { YELP_APIKEY } from "@env";
import BottomTabs from "../components/Eats/BottomTabs";
import { Divider } from "@rneui/themed";

const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url:
      "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

const EatsScreen = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Rybnik");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_APIKEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <View className="bg-white flex-1">
      <View className="mt-10 p-3">
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchRestaurants cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FoodCategories />
        {/* CONTAINER FOR RESTAURANT_ITEMS COMPONENTS*/}
        <View className="">
          <RestaurantItem
            restaurantData={restaurantData}
            navigation={navigation}
          />
        </View>
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </View>
  );
};

export default EatsScreen;
