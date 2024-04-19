import { StyleSheet, View } from "react-native";

import { RootState, useTypedSelector } from "../store/redux/store";

export function FavoritesScreen() {
  const favoriteCoins = useTypedSelector(
    (state: RootState) => state.favorites.favoriteCoins,
  );
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
