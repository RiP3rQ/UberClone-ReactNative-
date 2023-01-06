import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import OrderItem from "./OrderItem";

const ViewCart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { items, restaurantName } = useSelector(selectCart);

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const checkoutModalContent = () => {
    return (
      <View className="flex-1 justify-end bg-black/70">
        <View className="bg-white p-4" style={{ borderWidth: 1, height: 500 }}>
          <Text className="text-center font-semibold text-lg mb-2">
            {restaurantName}
          </Text>
          {items.map((item, index) => (
            <OrderItem key={index} title={item.title} price={item.price} />
          ))}
          <View className="flex-row justify-between mt-4">
            <Text className="text-left font-semibold text-base mb-2">
              Subtotal:
            </Text>
            <Text>{totalUSD}</Text>
          </View>
          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-black items-center mt-5 p-3 rounded-3xl w-72 relative"
            >
              <Text className="text-white text-xl">Checkout</Text>
              <Text className="absolute right-5 text-white text-sm top-4">
                {total ? totalUSD : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View className="flex-1 items-center justify-center flex-row absolute bottom-2">
          <View className="flex-row justify-center w-full">
            <TouchableOpacity
              className="relative w-72 rounded-3xl p-3 items-center bg-black mt-5 flex-row justify-end"
              onPress={() => setModalVisible(true)}
            >
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
