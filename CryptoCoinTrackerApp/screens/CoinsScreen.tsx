import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
} from "react-native";

import { CoinView } from "../components/CoinView/CoinView";
import { RootStackParamList } from "../navigation/stack/HomeStack";
import { fetchCoins } from "../store/redux/actions/coinsActions";
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from "../store/redux/store";
import { Coin } from "../store/redux/types/types";

type CoinsScreenProps = NativeStackScreenProps<RootStackParamList, "Coins">;

export function CoinsScreen({ navigation }: CoinsScreenProps) {
  const dispatch = useTypedDispatch();
  const { width: screenWidth } = useWindowDimensions();
  const { coins, loading, error } = useTypedSelector(
    (state: RootState) => state.coins,
  );

  const renderItem = ({ item }: { item: Coin }) => (
    <Pressable
      onPress={() => {
        // TODO: Set Selected Coin using dispatch
        navigation.navigate("Details");
      }}
    >
      <CoinView item={item} />
    </Pressable>
  );
  const memoizedFetchCoins = useCallback(() => {
    if (!coins) {
      dispatch(fetchCoins(1, 10, []));
    }
  }, [dispatch, coins]);

  useEffect(() => {
    memoizedFetchCoins();
  }, [memoizedFetchCoins]);

  return (
    <View style={styles.container}>
      {loading ? <Text>{"Loading ... "}</Text> : null}
      {error ? <Text>{error}</Text> : null}
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
});
