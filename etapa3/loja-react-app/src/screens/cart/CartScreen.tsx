import React, {useContext} from "react";
import { View, FlatList, StyleSheet, Text, Button } from "react-native";
export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text>Tela do Carrinho</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});