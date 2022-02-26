import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import OrdersContext from '../context/orders/ordersContext';

export const ProgressOrderScreen = () => {
  const {idOrder} = useContext(OrdersContext);
  return (
    <View>
      <Text>ProgressOrderScreen</Text>
    </View>
  );
};
