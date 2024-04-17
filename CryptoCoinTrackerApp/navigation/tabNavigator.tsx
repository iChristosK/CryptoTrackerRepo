import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";

import { store } from "./../store/redux/store";
import { FavoriteStack } from "./stack/FavoritesStack";
import { HomeStack } from "./stack/HomeStack";
import { TabBarIcon } from "../components/Icons/TabBarIcon";
import { StatusBarContainer } from "../utils/statusbar";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBarContainer barStyle="default" />
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="bitcoin" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="star" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
