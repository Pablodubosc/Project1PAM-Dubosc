import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Dropdown = ({
  value = {},
  items = [],
  name = "",
  onSelect = () => {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownStyle}
        activeOpacity={0.8}
        onPress={() => {
          setShowOptions(!showOptions);
        }}
      >
        <Text style={{
                 color:"white",
                 fontSize:17,
                 textAlign:"center",
                 textAlignVertical:"center"
                }}>{value}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View>
          {items.map((val, i) => {
            return (
              <TouchableOpacity
                key={String(i)}
                style={{
                  backgroundColor: "#90e0ef",
                  top:"90%"
                }}
                onPress={() => {
                  setShowOptions(false);
                  onSelect(val);
                }}
              >
                <Text style={{
                  color:"black"
                }}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    backgroundColor: "#0096c7",
    width:100,
    height:30,
    top:90,
    borderRadius:25,
  },
});

export default Dropdown;
