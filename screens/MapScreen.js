import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Map from "../components/Map";
import MapView, { Marker } from "react-native-maps";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

const MapScreen = ({ route }) => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeScreen", {
            useAsOrigin: "true",
          });
          dispatch(setOrigin(null));
          dispatch(setDestination(null));
          dispatch(
            setTravelTimeInformation({
              status: "NOT_FOUND",
            })
          );
        }}
        className="bg-gray-100 absolute top-10 left-3 z-50 p-3 rounded-full shadow-lg"
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View className="h-1/2">
        <Map route={route} />
      </View>

      <View className="h-1/2 bg-white">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            options={{
              headerShown: false,
            }}
          >
            {() => <NavigateCard route={route} />}
          </Stack.Screen>
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
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
