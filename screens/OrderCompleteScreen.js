import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
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
import { selectCart } from "../slices/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { items, restaurantName } = useSelector(selectCart);

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

  console.log(lastOrder);

  return (
    <SafeAreaView className="flex-1 bg-white">
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
            className="h-48 self-center"
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
