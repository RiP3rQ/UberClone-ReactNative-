import { View, Text, Image } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, selectCart } from "../../slices/cartSlice";

const MenuItems = ({ foods, restaurantName }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const isFoodInCart = (foods, items) =>
    Boolean(items.find((item) => item.title === foods.title));

  return (
    <View>
      <View className="flex-row justify-evenly m-5">
        <BouncyCheckbox
          iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
          fillColor="green"
          innerIconStyle={{
            borderRadius: 8, // to make it a little round increase the value accordingly
          }}
          onPress={(checkboxValue) =>
            dispatch(
              ADD_TO_CART({
                ...foods,
                restaurantName: restaurantName,
                checkboxValue: checkboxValue,
              })
            )
          }
          isChecked={isFoodInCart(foods, items)}
        />
        <FoodInfo foods={foods} /> 
        <FoodImage image={foods.image} />
      </View>
      <Divider width={0.5} orientation="vertical" />
    </View>
  );
};

export default MenuItems;

const FoodInfo = ({ foods }) => (
  <View className="w-60 justify-evenly">
    <Text className="text-2xl font-semibold">{foods.title}</Text>
    <Text>{foods.description}</Text>
    <Text className="font-medium text-base">{foods.price}</Text>
  </View>
);

const FoodImage = ({ image }) => (
  <Image
    source={{ uri: image }}
    style={{ height: 100, width: 100, borderRadius: 8 }}
  />
);
