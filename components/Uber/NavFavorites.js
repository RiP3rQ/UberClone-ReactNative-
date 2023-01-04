import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritePlaces,
  setDestination,
  setOrigin,
} from "../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// const data = [
//   {
//     id: "123",
//     icon: "home",
//     location: "Home",
//     destination: "Code Street, London, UK",
//   },
//   {
//     id: "456",
//     icon: "briefcase",
//     location: "Work",
//     destination: "London Eye, London, UK",
//   },
// ];

const NavFavorites = ({ route }) => {
  const favPlaces = useSelector(selectFavoritePlaces);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { useAsOrigin } = route.params;

  return (
    <SafeAreaView className=" w-full relative -mt-10 ">
      <Text className="font-semibold text-2xl px-3 py-3">Favorite places:</Text>
      <View className="absolute top-14 left-0 w-full h-60 mt-5">
        <View className="">
          {favPlaces?.length > 0 ? (
            <FlatList
              data={favPlaces}
              ItemSeparatorComponent={() => (
                <View className="bg-gray-200" style={{ height: 2 }} />
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item: { name, description, icon, location } }) => (
                <TouchableOpacity
                  className="flex-row items-center p-1"
                  onPress={() => {
                    if (useAsOrigin === "true") {
                      dispatch(
                        setOrigin({
                          location: location,
                          description: description,
                        })
                      );
                      navigation.navigate("MapScreen", {
                        useAsOrigin: "false",
                      });
                    }
                    if (useAsOrigin === "false") {
                      dispatch(
                        setDestination({
                          location: location,
                          description: description,
                        })
                      );
                      navigation.navigate("RideOptionsCard", {
                        useAsOrigin: "true",
                      });
                    } else {
                      return;
                    }
                  }}
                >
                  <Icon
                    className="mr-4 rounded-full p-3"
                    name={icon}
                    color="#d3d3d3"
                    size={18}
                    type="ionicon"
                    reverse
                  />
                  <View>
                    <Text className="font-semibold text-lg">{name}</Text>
                    <Text className="text-gray-500">{description}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View className="items-center justify-center mt-12">
              <Text className="pb-5 font-bold px-6 ">
                You don't have any favorite places added. You can change it
                right now.
              </Text>
              <Image
                className="h-20 w-20 "
                source={{
                  uri: "https://links.papareact.com/6gb",
                }}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
