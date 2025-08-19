import React from "react";
import { View, Text, Button } from "react-native";

export default function RegisterScreen({nav}: any){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de registro</Text>
      <Button title="voltar" onPress={() => nav.goBack() } />
    </View>
  );
}