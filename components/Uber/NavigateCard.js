import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import Ionicons from "react-native-vector-icons/Ionicons";

const NavigateCard = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const autoComplete = useRef(null);

  return (
    <SafeAreaView className="h-max">
      <Text className="text-center py-5 text-xl">Good Morning, RiP3rQ</Text>
      <View className="border-t border-gray-200">
        <View className="h-54 mt-2 flex-row z-40">
          <GooglePlacesAutocomplete
            ref={autoComplete}
            placeholder="Where to?"
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={{
              textInput: {
                backgroundColor: "white",
                borderRadius: 20,
                fontWeight: "700",
                marginTop: 7,
              },
              textInputContainer: {
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 5,
              },
              container: {
                zIndex: 50,
              },
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            textInputProps={{ clearButtonMode: "never" }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            renderRightButton={() => (
              <TouchableOpacity
                onPress={() => {
                  autoComplete.current.clear();
                  dispatch(setDestination(null));
                }}
                className="flex-row items-center z-50"
              >
                <Ionicons name="close-circle-outline" size={24} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="mx-3 mt-3">
          <NavFavorites route={route} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
