import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

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
        options={{ title: "Favorites" }}
      />
    </Stack.Navigator>
  );
};
