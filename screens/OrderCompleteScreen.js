import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { db } from "../firebase";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { CLEAR_CART, selectCart } from "../slices/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function OrderCompleteScreen() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
      },
    ],
  });
  const [loading, setLoading] = useState(null);
  const [popUp, setPopUp] = useState(true);
  const { items, restaurantName } = useSelector(selectCart);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(1)),
      (snapshot) =>
        setLastOrder(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
    setLoading(false);

    return () => unsubscribe();
  }, [db]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!popUp) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert("Leaving already?", "Are you sure to leave the screen?", [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              dispatch(CLEAR_CART());
              navigation.dispatch(e.data.action);
              navigation.navigate("EatsScreen");
            },
          },
        ]);
      }),
    [popUp, navigation]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* GO BACK BUTTON */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EatsScreen");
          dispatch(CLEAR_CART());
        }}
        className="absolute top-9 left-3 z-40 p-1 rounded-full bg-black/30"
      >
        <Icon name="chevron-left" size={32} color="white" />
      </TouchableOpacity>
      {/* END GO BACK BUTTON */}

      {/* green checkmark */}
      <View className="m-4 items-center h-full">
        <LottieView
          className="h-24 self-center mb-7"
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text className="text-lg font-semibold">
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView className="">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            lastOrder[0]?.items.map((item, index) => (
              <MenuItems
                foods={item}
                hideCheckbox={true}
                marginLeft={-20}
                key={index}
              />
            ))
          )}

          <LottieView
            className="h-48 self-center mb-6"
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
