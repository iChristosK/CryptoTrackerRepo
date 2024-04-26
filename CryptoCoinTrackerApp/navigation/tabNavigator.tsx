import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";

import { store } from "./../store/redux/store";
import { FavoriteStack } from "./stack/FavoritesStack";
import { HomeStack } from "./stack/HomeStack";
import { Icon } from "../../CryptoCoinTrackerApp/components/Icons/Icon";
import { TOAST_PLACEMENT } from "../../CryptoCoinTrackerApp/constants/Constants";
import { StatusBarContainer } from "../utils/StatusBarUtil";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider
          placement={TOAST_PLACEMENT}
          duration={2800}
          animationDuration={200}
          normalColor="gray"
          style={{ borderRadius: 15, width: "75%" }}
          textStyle={{ fontSize: 20 }}
          offset={50}
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled
        >
          <NavigationContainer>
            <StatusBarContainer barStyle="default" />
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color }) => (
                    <Icon name="bitcoin" color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Favorite"
                component={FavoriteStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color }) => <Icon name="star" color={color} />,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
};
