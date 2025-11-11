import React, { createContext, useContext, useState } from 'react';

type ShopContextType = {
  cartItems: any[];
  addToCart: (item: any, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => void;
  getTotalPrice: () => string;
  orderInfo: any;
  lastOrderInfo: (orderInfo: any) => void;
};

export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType
);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderInfo, setOrderInfo] = useState<any[]>([]);

  const addToCart = async (item: any, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = async (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]); // <-- AQUI!
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const lastOrderInfo = (orderInfo:any) => {
    setOrderInfo(orderInfo);
  };
  return (
    <ShopContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, lastOrderInfo, orderInfo }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
