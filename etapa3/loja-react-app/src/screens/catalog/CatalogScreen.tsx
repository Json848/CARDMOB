import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import CatalogCard from './CatalogCard';

const CatalogScreen = ({ navigation }: any) => {
  const handleBuyPress = (product: any) => {
    Alert.alert(
      'Compra',
      `Você comprou o ${product.name} por $${product.price}`
    );
  };
  const renderItem = ({ product }: any) => (
    <CatalogCard product={product} onBuyPress={() => handleBuyPress(product)} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
export default CatalogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  }, 
  list: {
    paddingBottom: 16,
  },
});