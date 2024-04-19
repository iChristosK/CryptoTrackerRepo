import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";

import { Icon } from "../../../CryptoCoinTrackerApp/components/Icons/Icon";
import { FavoritesScreen } from "../../screens/FavoritesScreen";

export type FavStackParamList = {
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<FavStackParamList>();

export const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
        }}
      />
    </Stack.Navigator>
  );
};
