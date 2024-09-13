import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";

import { fetchCoins } from "../../store/redux/actions/coinsActions";
import { resetCoins } from "../../store/redux/reducers/coinsReducer";
import { useAppDispatch } from "../../store/redux/store";

interface SearchBarProps {
  searchPhrase: string;
  setSearchPhrase: (searchText: string) => void;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}
export const SearchBar = (props: SearchBarProps) => {
  const dispatch = useAppDispatch();
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
          onResponderStart={() => {
            dispatch(resetCoins());
          }}
          onSubmitEditing={() => {
            dispatch(
              fetchCoins({
                currentPage: 1,
                coinsPerPage: 1,
                searchTerm: props.searchPhrase,
              }),
            );
          }}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              dispatch(resetCoins());
              dispatch(
                fetchCoins({
                  currentPage: 1,
                  coinsPerPage: 100,
                  searchTerm: "",
                }),
              );
              props.setSearchPhrase("");
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

/**
 * Retrieves pagination data from the Redux store using custom hooks useAppSelector.
Renders a search bar with an icon, input field, and cancel button.
Handles text input and search functionality using TextInput component.
Dispatches actions to reset coins and fetch new coins based on search input and pagination.
Displays a cancel button when the search bar is clicked, allowing users to dismiss the keyboard and cancel the search.
 */
