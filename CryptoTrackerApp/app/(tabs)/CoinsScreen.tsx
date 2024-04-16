import { useCallback, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { View, Text } from "@/components/Theme/Themed";
import { COINS_MANUALLY } from "@/constants/Coins";
import { fetchCoinsData } from "@/redux/actions/coinsActions";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Coin } from "@/redux/types/types";

export default function TabOneScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.coins);
  const coins = COINS_MANUALLY;

  const renderItem = ({ item }: { item: Coin }) => (
    <Pressable>
      <View style={styles.coinItem}>
        <Text>{item.name}</Text>
        <Text>{item.symbol}</Text>
        <Text>{item.current_price}</Text>
        <Text>{item.market_cap_rank}</Text>
        <Text>{item.price_change_24h}</Text>
        <Text>{item.price_change_percentage_24h}</Text>
      </View>
    </Pressable>
  );
  const memoizedFetchCoins = useCallback(() => {
    if (!coins) {
      dispatch(fetchCoinsData({ currentPage: 1, coinsPerPage: 10 }));
    }
    return () => {
      dispatch(fetchCoinsData({ currentPage: 1, coinsPerPage: 10 }));
    };
  }, [dispatch, coins]);

  useEffect(() => {
    memoizedFetchCoins();
  }, [memoizedFetchCoins]);

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: screenWidth - 40,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  coinItem: {
    borderRadius: 5,
    flex: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});
