import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants'; 

import { useShop } from '../../context/ShopContext';

const OrderInfoScreen = ({ navigation }: any) => {
  const {
    orderInfo,
  }: {
    orderInfo: {
      id: string;
      status: string;
      customerName: string;
      customerAddress: string;
      totalPrice: number;
      orderOffering: {
        offering: { name: string; image: string };
        quantity: number;
        subtotal: number;
      }[];
    };
  } = useShop();

  const [orderData, setOrderData] = useState<any[]>([]);
  const { apiUrl } = Constants.expoConfig?.extra || {}; 

  const loadOrder = () => {
    console.log(orderInfo);
    if (orderInfo.id) {
      const lastOrder = [
        { label: '', value: orderInfo.status, isStatus: true },
        { label: 'Nome', value: orderInfo.customerName },
        { label: 'Endereço de entrega', value: orderInfo.customerAddress },
        { label: 'Total', value: `R$ ${orderInfo.totalPrice.toFixed(2)}` },
        ...orderInfo.orderOffering.map((item: any) => ({
          label: item.offering.name,
          value: `x${item.quantity} - subtotal: R$ ${item.subtotal.toFixed(2)}`,
          image: `${apiUrl}/${item.offering.image}`, // ✅ URL correta
          isOrderItem: true,
        })),
      ];
      setOrderData(lastOrder);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const renderItem = ({ item }: any) => {
    if (item.isOrderItem) {
      return (
        <View style={styles.itemRow}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>
              {item.label} ({item.value})
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.infoRow}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={item.isStatus ? styles.statusValue : styles.value}>
          {item.value}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orderInfo.id ? (
        <View>
          <Text style={styles.title}>Nº {orderInfo.id}</Text>
          <FlatList
            data={orderData}
            renderItem={renderItem}
            keyExtractor={(item: any, index: number) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <View style={styles.infoRow}>
          <Text style={styles.title}>Nenhum pedido encontrado.</Text>
        </View>
      )}
    </View>
  );
};

export default OrderInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1, // ✅ adicionado
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontStyle: 'italic',
  },
  statusValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF5733',
    backgroundColor: '#FFE5E0',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
