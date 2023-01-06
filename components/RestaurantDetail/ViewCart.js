import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import OrderItem from "./OrderItem";
import Modal from "../Uber/AddNavFavorites";
import { FlatList } from "react-native-gesture-handler";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const ViewCart = () => {
  const { items, restaurantName } = useSelector(selectCart);
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToFireBase = () => {
    setLoading(true);
    closeModal();
    addDoc(collection(db, "orders"), {
      items: items,
      createdAt: serverTimestamp(),
    }).then(() => {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("OrderCompleteScreen");
      }, 2500);
    });
  };

  console.log(items);

  const checkoutModalContent = () => {
    return (
      <View className="flex-1 bg-white h-full p-4">
        <Text className="text-center font-semibold text-l">
          {restaurantName}
        </Text>
        <View className="h-[340px]">
          <View className="flex-1 relative">
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <OrderItem title={item.title} price={item.price} />
              )}
            />
          </View>
        </View>
        <View className="flex-row justify-between mt-4 absolute bottom-20 left-0 right-0 px-4">
          <Text className="text-left font-semibold text-base mb-2">
            Subtotal:
          </Text>
          <Text>{totalUSD}</Text>
        </View>
        <View className="flex-row justify-center absolute bottom-5 items-center right-0 left-0">
          <TouchableOpacity
            className="bg-black items-center mt-5 p-3 rounded-3xl w-72 relative"
            onPress={() => addOrderToFireBase()}
          >
            <Text className="text-white text-xl">Checkout</Text>
            <Text className="absolute right-5 text-white text-sm top-4">
              {total ? totalUSD : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {total ? (
        <View className="flex-1 items-center justify-center flex-row absolute bottom-2">
          <View className="flex-row justify-center w-full">
            <TouchableOpacity
              className="relative w-72 rounded-3xl p-3 items-center bg-black mt-5 flex-row justify-end"
              onPress={() => pressHandler()}
            >
              <Text className="text-white text-xl mr-12">View Cart</Text>
              <Text className="text-white text-xl">{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      <Modal
        activeHeight={height * 0.65}
        ref={bottomSheetRef}
        backgroundColor={"#F2F4F1"}
        backDropColor={"black"}
      >
        {checkoutModalContent()}
      </Modal>

      {loading ? (
        <View className="bg-black absolute opacity-60 justify-center items-center h-full w-full z-50">
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;
