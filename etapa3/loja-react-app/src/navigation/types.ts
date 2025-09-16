import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Settings: undefined;
  Cart: undefined;
  Register: undefined;
  Catalog: undefined;
};
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Details: { itemId: number };
  Logins: undefined;
};
export type AuthTabParamList = {
  Home: undefined;
  Settings: undefined;
};
export type AuthStackParamList = {
  Tabs: NavigatorScreenParams<AuthTabParamList>;
  Details: { itemId: number };
};
