import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_PLACES_APIKEY } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesing from "react-native-vector-icons/AntDesign";
import { useRef } from "react";

const SearchRestaurants = ({ cityHandler }) => {
  const autoComplete = useRef(null);
  return (
    <View className="mt-4 flex-row">
      <GooglePlacesAutocomplete
        ref={autoComplete}
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder="Search restaurants..."
        debounce={400}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        query={{
          key: GOOGLE_MAPS_PLACES_APIKEY,
        }}
        minLength={2}
        enablePoweredByContainer={false}
        returnKeyType={"search"}
        renderLeftButton={() => (
          <View className="ml-2">
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        textInputProps={{ clearButtonMode: "never" }}
        renderRightButton={() => (
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                autoComplete.current.clear();
              }}
            >
              <Ionicons name="close-circle-outline" size={24} />
            </TouchableOpacity>
            <View className="flex-row mr-2 bg-white p-2 rounded-3xl items-center">
              <AntDesing
                name="clockcircle"
                size={11}
                style={{ marginRight: 6 }}
              />
              <Text>Search</Text>
            </View>
          </View>
        )}
        onPress={(data, details) => {
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
      />
    </View>
  );
};

export default SearchRestaurants;
