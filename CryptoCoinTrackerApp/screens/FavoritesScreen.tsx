import { FlatList, useWindowDimensions } from "react-native";

import { CoinView } from "../../CryptoCoinTrackerApp/components/CoinView/CoinView";
import { RootState, useTypedSelector } from "../store/redux/store";
import { Coin } from "../types/Coin";

export function FavoritesScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const favoriteCoins = useTypedSelector(
    (state: RootState) => state.favorites.favoriteCoins,
  );
  const coins = useTypedSelector((state: RootState) => state.coins.coins);
  if (!coins) {
    return null;
  }
  const filteredCoins = coins.filter((favorite) =>
    favoriteCoins.includes(favorite.id),
  );

  const renderItem = ({ item }: { item: Coin }) => <CoinView item={item} />;

  return (
    <FlatList
      data={filteredCoins}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        width: screenWidth,
      }}
    />
  );
}

/**
 * Implements handleLoadMore function to load more coins when reaching the end of the list.
Uses useCallback and useEffect hooks to memoize and execute fetching coins action.
Renders a view with a search bar, loading/error indicators, and a FlatList to display coins.
Configures FlatList with necessary props like data source, rendering function, key extractor, content container style, and refresh control.
 */
