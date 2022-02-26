import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import OrdersContext from '../../context/orders/ordersContext';

export const ButtonSummary = onPress => {
  const navigation = useNavigation();
  const {order} = useContext(OrdersContext);
  // si no hay nada elm compoente retirn null
  if (order.length === 0) {
    return null;
  }
  return (
    <Button
      mode="text"
      color="#239B56"
      icon="cart"
      onPress={() => navigation.navigate('order-summary')}>
      <Text style={styles.text}>
        Ver Pedido <Text style={styles.total}>{order.length}</Text>
      </Text>
    </Button>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  total: {
    color: '#239B56',
  },
});
