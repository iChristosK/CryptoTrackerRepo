import {
  FlatList,
  useWindowDimensions,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { CoinView } from "../../CryptoCoinTrackerApp/components/CoinView/CoinView";
import { RootState, useAppSelector } from "../store/redux/store";
import { Coin } from "../types/Coin";

export function FavoritesScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const favoriteCoins = useAppSelector(
    (state: RootState) => state.favorites.favoriteCoins,
  );
  const { error } = useAppSelector((state: RootState) => state.coins);

  const renderItem = ({ item }: { item: Coin }) => <CoinView item={item} />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text> {error} </Text>
      </View>
    );
  }

  if (favoriteCoins.length === 0) {
    return (
      <View style={styles.container}>
        <Text> No favorite coins </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteCoins}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        width: screenWidth,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
