import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const CatalogCard = ({ product, onBuyPress }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonsConteiner}>
        <Button
          title="Adicionar ao Carrinho"
          color="#28a745"
          onPress={onBuyPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonsConteiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default CatalogCard;
