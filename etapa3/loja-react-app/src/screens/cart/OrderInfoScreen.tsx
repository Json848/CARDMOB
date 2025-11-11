import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

import { useShop } from '../../context/ShopContext';

const OrderInfoScreen = ({ navigation }: any) => {
  const { orderInfo } = useShop();
  const [orderData, setOrderData] = useState<any[]>([]);

  const loadOrder = () => {
    // console.log(orderInfo);
    if (orderInfo && orderInfo.id) {
      const offerings = orderInfo.orderOffering || []; // protege quando undefined
      const lastOrder = [
        { label: '', value: orderInfo.status, isStatus: true },
        { label: 'Nome', value: orderInfo.customerName },
        { label: 'Endereço de entrega', value: orderInfo.customerAddress },
        {
          label: 'Total',
          value: `R$ ${Number(orderInfo.totalPrice || 0).toFixed(2)}`,
        },
        ...offerings.map((item: any) => ({
          label: item.offering?.name ?? 'Item',
          value: `x${item.quantity} - subtotal: R$ ${Number(
            item.subtotal || 0
          ).toFixed(2)}`,
          image: item.offering?.image ?? undefined,
          isOrderItem: true,
        })),
      ];
      setOrderData(lastOrder);
    } else {
      setOrderData([]);
    }
  };

  // Adiciona orderInfo como dependência para recarregar quando chegar/atualizar
  useEffect(() => {
    loadOrder();
  }, [orderInfo]);

  const renderItem = ({ item }: any) => {
    if (item.isOrderItem) {
      return (
        <View style={styles.itemRow}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          ) : (
            <View style={[styles.itemImage, styles.imagePlaceholder]} />
          )}
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
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orderInfo && orderInfo.id ? (
        <View>
          <Text style={styles.title}>Nº {orderInfo.id}</Text>
          <FlatList
            data={orderData}
            renderItem={renderItem}
            keyExtractor={(_item, index) => index.toString()}
            contentContainerStyle={styles.container}
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
  container: { padding: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  itemImage: {
    height: 80,
    width: 80,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  imagePlaceholder: { backgroundColor: '#ccc' },
  itemInfo: { marginLeft: 12, flex: 1 },
  itemName: { fontSize: 16 },
  infoRow: { marginVertical: 6 },
  label: { fontWeight: '600' },
  value: { marginTop: 2 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
});
