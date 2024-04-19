import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  RefreshControl,
} from "react-native";

import { CoinView } from "../../CryptoCoinTrackerApp/components/CoinView/CoinView";
import { SearchBar } from "../components/Search/SearchBar";
import { RootStackParamList } from "../navigation/stack/HomeStack";
import {
  fetchCoins,
  selectCoinID,
  setPagination,
} from "../store/redux/actions/coinsActions";
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from "../store/redux/store";
import { Coin } from "../types/Coin";

type CoinsScreenProps = NativeStackScreenProps<RootStackParamList, "Coins">;

export function CoinsScreen({ navigation }: CoinsScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const dispatch = useTypedDispatch();

  const { width: screenWidth } = useWindowDimensions();
  const { coins, loading, error, pagination } = useTypedSelector(
    (state: RootState) => state.coins,
  );

  const renderItem = ({ item }: { item: Coin }) => (
    <Pressable
      onPress={() => {
        const coinID = item.id;
        dispatch(selectCoinID(coinID));
        navigation.navigate("Details");
      }}
    >
      <CoinView item={item} />
    </Pressable>
  );

  const handleRefresh = () => {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);
    dispatch(fetchCoins(1, pagination.coinsPerPage, searchPhrase));
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    const newPagination = {
      page: pagination.page + 1,
      coinsPerPage: pagination.coinsPerPage,
    };
    if (pagination.page < newPagination.page + 1) {
      dispatch(setPagination(newPagination));
      fetchCoins(newPagination.page, pagination.coinsPerPage, searchPhrase);
    }
  };

  const memoizedFetchCoins = useCallback(() => {
    if (!coins) {
      dispatch(
        fetchCoins(pagination.page, pagination.coinsPerPage, searchPhrase),
      );
    }
  }, [dispatch, pagination, coins, searchPhrase]);

  useEffect(() => {
    memoizedFetchCoins();
  }, [memoizedFetchCoins]);

  return (
    <View style={styles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        clicked={clicked}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      {loading ? <Text>Loading ... </Text> : null}
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: screenWidth - 40,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
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

/**
 * Implements handleLoadMore function to load more coins when reaching the end of the list.
Uses useCallback and useEffect hooks to memoize and execute fetching coins action.
Renders a view with a search bar, loading/error indicators, and a FlatList to display coins.
Configures FlatList with necessary props like data source, rendering function, key extractor, content container style, and refresh control.
 */
