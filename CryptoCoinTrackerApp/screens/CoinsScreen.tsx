import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
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
import { fetchCoins } from "../store/redux/actions/coinsActions";
import {
  resetCoins,
  selectCoin,
  setPagination,
} from "../store/redux/reducers/coinsReducer";
import { useAppDispatch, useAppSelector } from "../store/redux/store";
import { Coin } from "../types/Coin";

type CoinsScreenProps = NativeStackScreenProps<RootStackParamList, "Coins">;

export function CoinsScreen({ navigation }: CoinsScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const dispatch = useAppDispatch();

  const { width: screenWidth } = useWindowDimensions();
  const { coins, loading, error, pagination } = useAppSelector(
    (state) => state.coins,
  );
  //TODO: Use efficient/specified selectors
  const renderItem = ({ item }: { item: Coin }) => (
    <Pressable
      onPress={() => {
        const coin = item;
        dispatch(selectCoin(coin));
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
    dispatch(resetCoins());
    dispatch(
      fetchCoins({
        currentPage: pagination.page,
        coinsPerPage: pagination.coinsPerPage,
        searchTerm: searchPhrase,
      }),
    );
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    const newPagination = {
      page: pagination.page + 1,
      coinsPerPage: pagination.coinsPerPage,
    };
    if (pagination.page < newPagination.page + 1) {
      dispatch(setPagination(newPagination));
      dispatch(
        fetchCoins({
          currentPage: newPagination.page,
          coinsPerPage: pagination.coinsPerPage,
          searchTerm: searchPhrase,
        }),
      );
    }
  };

  const memoizedFetchCoins = useCallback(() => {
    if (!coins) {
      dispatch(
        fetchCoins({
          currentPage: pagination.page,
          coinsPerPage: pagination.coinsPerPage,
          searchTerm: searchPhrase,
        }),
      );
    }
  }, [dispatch, pagination, coins, searchPhrase]);

  useEffect(() => {
    memoizedFetchCoins();
  }, [memoizedFetchCoins]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  if (!coins) {
    return (
      <View style={styles.container}>
        <Text> No coins found </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        clicked={clicked}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: screenWidth - 40,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
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
