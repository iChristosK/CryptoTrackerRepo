import { Feather, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";

import { fetchCoins, resetCoins } from "../../store/redux/actions/coinsActions";
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
} from "../../store/redux/store";

interface SearchBarProps {
  searchPhrase: string;
  setSearchPhrase: (searchText: string) => void;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}
export const SearchBar = (props: SearchBarProps) => {
  const dispatch = useTypedDispatch();
  const { pagination, coins } = useTypedSelector(
    (state: RootState) => state.coins,
  );

  console.log("coins", coins?.length);
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={(text) => props.setSearchPhrase(text)}
          onSubmitEditing={() => {
            dispatch(resetCoins());
            dispatch(
              fetchCoins(
                pagination.page,
                pagination.coinsPerPage,
                props.searchPhrase,
              ),
            );
          }}
          onFocus={() => {
            props.setClicked(true);
          }}
        />

        {props.clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
