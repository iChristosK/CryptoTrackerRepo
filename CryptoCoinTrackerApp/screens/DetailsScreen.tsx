import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { Icon } from "../../CryptoCoinTrackerApp/components/Icons/Icon";
import { RootStackParamList } from "../navigation/stack/HomeStack";
import {
  fetchCoinDetailedData,
  fetchMarketChartByCoinID,
  resetDetailedData,
  resetMarketChartData,
} from "../store/redux/actions/coinsActions";
import { markFavorite } from "../store/redux/actions/favoriteActions";
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from "../store/redux/store";
import { convertKeyValueData } from "../utils/ConvertUtil";
import { parseTimestampIntoDateMonthYear } from "../utils/DateUtil";

type DetailedSreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

export function DetailsScreen({ navigation }: DetailedSreenProps) {
  const dispatch = useTypedDispatch();
  const { width: screenWidth } = useWindowDimensions();

  const {
    coinID,
    coinChartData,
    coinDetailedData,
    chartError,
    chartLoading,
    detailedError,
    detailedLoading,
  } = useTypedSelector((state: RootState) => state.coins);

  const memoizedFetchMarketChart = useCallback(() => {
    if (!coinChartData && coinID) {
      dispatch(fetchMarketChartByCoinID(coinID));
    }
  }, [dispatch, coinID, coinChartData]);

  const memoizedFetchCoinDetailedData = useCallback(() => {
    if (!coinDetailedData && coinID) {
      dispatch(fetchCoinDetailedData(coinID));
    }
  }, [dispatch, coinID, coinDetailedData]);

  const memoizedFavoriteCoins = useCallback(() => {
    if (coinID) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={() => dispatch(markFavorite(coinID))}>
            <Icon name="star-o" color="gray" />
          </Pressable>
        ),
      });
    }
  }, [coinID, navigation, dispatch]);

  useEffect(() => {
    memoizedFetchMarketChart();
    memoizedFetchCoinDetailedData();
    memoizedFavoriteCoins();

    const unsubscribe = navigation.addListener("beforeRemove", () => {
      dispatch(resetMarketChartData());
      dispatch(resetDetailedData());
    });
    return () => {
      unsubscribe();
    };
  }, [
    coinID,
    navigation,
    dispatch,
    memoizedFetchMarketChart,
    memoizedFetchCoinDetailedData,
    memoizedFavoriteCoins,
  ]);

  const currentPriceData = useMemo(() => {
    if (coinDetailedData) {
      return convertKeyValueData(coinDetailedData.current_price);
    }
  }, [coinDetailedData]);

  const marketCapData = useMemo(() => {
    if (coinDetailedData) {
      return convertKeyValueData(coinDetailedData.market_cap);
    }
  }, [coinDetailedData]);

  const totalVolumeData = useMemo(() => {
    if (coinDetailedData) {
      return convertKeyValueData(coinDetailedData.total_volume);
    }
  }, [coinDetailedData]);

  const allTimeHighData = useMemo(() => {
    if (coinDetailedData) {
      return convertKeyValueData(coinDetailedData.ath);
    }
  }, [coinDetailedData]);

  const allTimeLowData = useMemo(() => {
    if (coinDetailedData) {
      return convertKeyValueData(coinDetailedData.atl);
    }
  }, [coinDetailedData]);

  const lineData = useMemo(() => {
    if (coinChartData) {
      return coinChartData.map(([timestamp, value]) => ({
        label: parseTimestampIntoDateMonthYear(timestamp),
        value,
      }));
    }
  }, [coinChartData]);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  if (!coinDetailedData) {
    return null;
  }

  const total_supply = coinDetailedData.total_supply;

  const circulating_supply = coinDetailedData.circulating_supply;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {chartLoading ? <Text> Chart is loading ... </Text> : null}
        {chartError ? <Text>{chartError}</Text> : null}
        <LineChart
          areaChart
          spacing={80}
          data={lineData}
          width={screenWidth - 20}
          yAxisLabelWidth={70}
        />
      </View>
      <View />
      <View style={styles.marketDetailedDataContainer}>
        {detailedLoading ? <Text>Details are loading ... </Text> : null}
        {detailedError ? <Text>{chartError}</Text> : null}

        <View style={styles.flatListContainer}>
          <Text style={styles.flatListLabel}> Market Cap</Text>
          <FlatList
            data={marketCapData}
            renderItem={renderItem}
            contentContainerStyle={{
              width: screenWidth - 120,
            }}
            keyExtractor={(item) => item.label} // Use a unique key
          />
        </View>

        <View style={styles.flatListContainer}>
          <Text> Current Prices</Text>
          <FlatList
            data={currentPriceData}
            renderItem={renderItem}
            contentContainerStyle={{
              width: screenWidth - 120,
            }}
            keyExtractor={(item) => item.label} // Use a unique key
          />
        </View>

        <View style={styles.flatListContainer}>
          <Text> Total Volume </Text>
          <FlatList
            data={totalVolumeData}
            renderItem={renderItem}
            contentContainerStyle={{
              width: screenWidth - 120,
            }}
            keyExtractor={(item) => item.label} // Use a unique key
          />
        </View>
        <View style={styles.flatListContainer}>
          <Text> All Time High</Text>
          <FlatList
            data={allTimeHighData}
            renderItem={renderItem}
            contentContainerStyle={{
              width: screenWidth - 120,
            }}
            keyExtractor={(item) => item.label} // Use a unique key
          />
        </View>
        <View style={styles.flatListContainer}>
          <Text> All Time Low</Text>
          <FlatList
            data={allTimeLowData}
            renderItem={renderItem}
            contentContainerStyle={{
              width: screenWidth - 120,
            }}
            keyExtractor={(item) => item.label} // Use a unique key
          />
        </View>
        <View>
          <Text> Circulating Supply {circulating_supply}</Text>
          <Text> Total Supply: {total_supply}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  marketDetailedDataContainer: {
    flex: 6,
  },
  flatListContainer: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    flex: 2,
  },
  flatListLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});
