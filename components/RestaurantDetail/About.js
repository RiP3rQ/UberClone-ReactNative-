import { View, Text, Image } from "react-native";
import React from "react";

const image =
  "https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg";
const title = "Essa dobra Restauracja Koks";
const description = "Thai . Comfort Food . $$ . 🎟 . 4 ⭐(2914+) ";

const About = () => {
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantTitle title={title} />
      <RestaurantDescription description={description} />
    </View>
  );
};

export default About;

const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} className="w-100 h-48" />
);

const RestaurantTitle = ({ title }) => (
  <Text className="font-bold text-3xl mt-2 mx-4">{title}</Text>
);

const RestaurantDescription = ({ description }) => (
  <Text className="mt-2 mx-4 font-normal text-base">{description}</Text>
);
