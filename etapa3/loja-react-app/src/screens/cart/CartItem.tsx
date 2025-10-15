import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useShop } from '../../context/ShopContext';

const CartItem = ({ item }: any) => {
  const { addToCart, removeFromCart } = useShop();

  const handleRemove = () => {
    removeFromCart(item.id);
    console.log('exclui produto');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.quantity}>
          <Text style={styles.price}>
            R$ {(item.price * item.quantity).toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={() => addToCart(item, -1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRemove()}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#ddd',
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
