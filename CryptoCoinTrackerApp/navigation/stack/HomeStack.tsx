import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";

import { Icon } from "../../components/Icons/Icon";
import { CoinsScreen } from "../../screens/CoinsScreen";
import { DetailsScreen } from "../../screens/DetailsScreen";

export type RootStackParamList = {
  Coins: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Coins"
        component={CoinsScreen}
        options={{ title: "Coins" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Details",
          headerRight: () => (
            <Pressable>
              <Icon name="star-o" color="gray" />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
