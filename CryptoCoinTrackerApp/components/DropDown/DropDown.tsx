import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";

interface DropdownItem {
  label: string;
  value: number;
}

interface DropdownProps {
  options: DropdownItem[];
}

export const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

export const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (value: number) => {
    setSelectedValue(value);
    setShowDropdown(false);
    setSearchText(
      options.find((option) => option.value === value)?.label || "",
    );
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text>
          {selectedValue !== null
            ? options.find((option) => option.value === selectedValue)?.label
            : "Select"}
        </Text>
      </TouchableOpacity>
      <Modal visible={showDropdown} animationType="slide">
        <View style={styles.modalContainer}>
          <Text> Searching for currency:</Text>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.optionsContainer}>
            {filteredOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleSelectOption(option.value)}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {searchText !== null && <Text>searchText value: {searchText}</Text>}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  optionsContainer: {
    width: "80%",
  },
  option: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
