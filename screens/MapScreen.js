import { View, Text } from "react-native";
import React from "react";
import Map from "../components/Map";
import MapView, { Marker } from "react-native-maps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <View className="h-1/2">
        <Map />
      </View>
      <View className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
