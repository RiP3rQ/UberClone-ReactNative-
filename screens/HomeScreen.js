import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import AddNavFavorites from "../components/AddNavFavorites";
import { Button, Icon } from "@rneui/base";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://icons-for-free.com/iconfiles/png/512/uber-1324440247504689178.png",
          }}
          className="ml-2"
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="Where from?"
          debounce={400}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          returnKeyType={"search"}
        />

        <NavOptions />
        <NavFavorites />

        {/* OPEN MODAL BUTTON */}
        <TouchableOpacity
          onPress={() => pressHandler()}
          className="absolute bottom-40 right-8 w-24 bg-black rounded-full h-8 items-center justify-center"
        >
          <Text className="font-semibold text-white text-center text-lg">
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <AddNavFavorites
        activeHeight={height * 0.5}
        ref={bottomSheetRef}
        backgroundColor={"#F2F4F1"}
        backDropColor={"black"}
      >
        <View className="flex-1"></View>
      </AddNavFavorites>
    </SafeAreaView>
  );
};

export default HomeScreen;
