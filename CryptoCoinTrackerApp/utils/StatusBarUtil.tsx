import React from "react";
import { ColorValue, StatusBar, StatusBarStyle } from "react-native";

interface StatusBarContainerProps {
  backgroundColor?: ColorValue;
  barStyle?: StatusBarStyle;
}

export const StatusBarContainer = ({
  backgroundColor,
  barStyle,
}: StatusBarContainerProps) => {
  return <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};
