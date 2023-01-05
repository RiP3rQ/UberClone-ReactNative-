import { View, Text, Image } from "react-native";
import React from "react";

const yelpRestaurantInfo = {
  name: "Essa dobra Restauracja Koks",
  image:
    "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg",
  price: "$$",
  reviews: "1500",
  rating: 4.9,
  categories: [{ title: "Thai" }, { title: "Comfort Food" }],
};

const { name, image, price, reviews, rating, categories } = yelpRestaurantInfo;
const formattedCategories = categories.map((cat) => cat.title).join(" · ");
const description = `${formattedCategories} ${
  price ? " · " + price : ""
} · 🎟  · ${rating}⭐ · (${reviews}+)`;

const About = () => {
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantTitle name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
};

export default About;

const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} className="w-100 h-48" />
);

const RestaurantTitle = ({ name }) => (
  <Text className="font-bold text-3xl mt-2 mx-4">{name}</Text>
);

const RestaurantDescription = ({ description }) => (
  <Text className="mt-2 mx-4 font-normal text-base">{description}</Text>
);
