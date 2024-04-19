import { StyleSheet, View, Text, Image } from "react-native";

import { Coin } from "../../../src/store/redux/types/types";

interface CoinViewProps {
  item: Coin;
}

export function CoinView({ item }: CoinViewProps) {
  return (
    <View style={styles.coinItemContainer}>
      <View style={styles.coinImageContainer}>
        <Image source={{ uri: item.image }} style={styles.coinPhoto} />
      </View>
      <View style={styles.coinDetailsContainer}>
        <Text style={styles.coinName}>{item.name}</Text>
        <Text style={styles.coinSymbol}>{item.symbol}</Text>
        <Text style={styles.coinCurrentPrice}>{`$ ${item.current_price}`}</Text>
        <Text style={styles.coinMarketCapRank}>
          {`Rank ${item.market_cap_rank}`}
        </Text>
        <Text>{`24h ${item.price_change_percentage_24h}`}</Text>
        <Text>{`7D ${item.price_change_percentage_24h}`}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  coinItemContainer: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  coinImageContainer: {
    flex: 4,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  coinDetailsContainer: {
    flex: 6,
  },
  coinPhoto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  coinSymbol: {
    fontSize: 19,
    fontWeight: "bold",
    color: "darkgrey",
  },
  coinName: {
    fontSize: 19,
    fontWeight: "bold",
  },
  coinMarketCapRank: {
    fontSize: 15,
    color: "grey",
    fontWeight: "bold",
  },
  coinCurrentPrice: {
    color: "darkblue",
    fontSize: 15,
    fontWeight: "bold",
  },
  coin: {
    borderRadius: 5,
    fontWeight: "bold",
  },
});
