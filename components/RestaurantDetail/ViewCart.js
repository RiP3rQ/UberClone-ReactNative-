import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";

const ViewCart = () => {
  const { items, restaurantName } = useSelector(selectCart);

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      {total ? (
        <View className="flex-1 items-center justify-center flex-row absolute bottom-2">
          <View className="flex-row justify-center w-full">
            <TouchableOpacity className="relative w-72 rounded-3xl p-3 items-center bg-black mt-5 flex-row justify-end">
              <Text className="text-white text-xl mr-12">View Cart</Text>
              <Text className="text-white text-xl">{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;
