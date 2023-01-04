import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import {
  setDestination,
  setOrigin,
  setFavoritePlaces,
} from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import AddNavFavorites from "../components/AddNavFavorites";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [newPlaceLocation, setNewPlaceLocation] = useState(null);
  const autoComplete = useRef(null);
  const autoCompleteModal = useRef(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current.close();
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
          ref={autoComplete}
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
          textInputProps={{ clearButtonMode: "never" }}
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
          renderRightButton={() => (
            <TouchableOpacity
              onPress={() => {
                autoComplete.current.clear();
                dispatch(setOrigin(null));
              }}
              className="flex-row items-center "
            >
              <Ionicons name="close-circle-outline" size={24} />
            </TouchableOpacity>
          )}
        />

        <NavOptions route={route} reference={autoComplete} />

        {/* OPEN MODAL BUTTON */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => pressHandler()}
            className="absolute top-1 right-8 w-24 bg-black rounded-full h-8 items-center justify-center z-10"
          >
            <Text className="font-semibold text-white text-center text-lg">
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <View className="relative">
          <NavFavorites route={route} />
        </View>
      </View>

      <AddNavFavorites
        activeHeight={height * 0.8}
        ref={bottomSheetRef}
        backgroundColor={"#F2F4F1"}
        backDropColor={"black"}
      >
        {/* INSIDE OF MODAL */}
        <View className="flex-1 bg-white h-full">
          <Text className="text-xl font-semibold text-center">
            ADD NEW FAVORITE PLACE:
          </Text>

          <View className="px-2">
            <GooglePlacesAutocomplete
              ref={autoCompleteModal}
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholder="Choose location of the place?"
              debounce={400}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              styles={{
                container: {
                  flex: 0,
                  zIndex: 50,
                },
                textInput: {
                  fontSize: 18,
                },
              }}
              minLength={2}
              enablePoweredByContainer={false}
              fetchDetails={true}
              textInputProps={{ clearButtonMode: "never" }}
              onPress={(data, details = null) => {
                setNewPlaceLocation({
                  location: details.geometry.location,
                  description: data.description,
                });
              }}
              returnKeyType={"search"}
              renderRightButton={() => (
                <TouchableOpacity
                  onPress={() => {
                    autoCompleteModal.current.clear();
                    setNewPlaceLocation(null);
                  }}
                  className="flex-row items-center "
                >
                  <Ionicons name="close-circle-outline" size={24} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View className="flex-row justify-between h-12 items-center px-2">
            <Text className="text-lg font-semibold">Name of the Place:</Text>
            <TextInput
              placeholder="Home / Work / Restaurant"
              className="flex-1 text-lg pl-3"
              onChangeText={setName}
              value={name}
            />
          </View>

          <View className="flex-row justify-between h-12 items-center px-2">
            <Text className="text-lg font-semibold">Icon of the place:</Text>
            <TextInput
              placeholder="home , briefcase, etc."
              className="flex-1 text-lg pl-3"
              onChangeText={setIcon}
              value={icon}
              autoCapitalize="none"
            />
          </View>

          <View className=" items-center justify-center">
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setFavoritePlaces({
                    id:
                      name +
                      Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
                    name: name,
                    icon: icon,
                    location: newPlaceLocation.location,
                    description: newPlaceLocation.description,
                  })
                );

                setNewPlaceLocation(null);
                setIcon("");
                setName("");
                Keyboard.dismiss();
                closeModal();
                autoCompleteModal.current.clear();
              }}
              className="bg-black rounded-full h-14 w-44 items-center justify-center"
            >
              <Text className="text-center text-white font-semibold text-xl">
                Add New Place
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AddNavFavorites>
    </SafeAreaView>
  );
};

export default HomeScreen;
