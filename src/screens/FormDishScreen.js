import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Divider, Surface} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import OrdersContext from '../context/orders/ordersContext';

export const FormDishScreen = () => {
  // cambir el numero de prodcutos
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);
  // obteniedno el platillo del context
  const {dish, saveOrder} = useContext(OrdersContext);
  const {precio} = dish;
  // hook para la navegacion del
  const navigation = useNavigation();
  // cuando el compoente carga se calcular el total a pagar
  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  // funcion que calcula el total del platilo por el total
  const calculateTotal = () => {
    const totalPay = precio * amount;
    setTotal(totalPay);
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  // confirma si la orden es correact
  const confirmOrder = () => {
    return Alert.alert(
      'Deseas confirma tu pedido',
      'Al confirmar el pedido no podras cancelarlo',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // agregar la orden al pedido
            const order = {
              ...dish,
              cantidad: amount,
              total,
            };
            // console.log(order);
            saveOrder(order);
            // navegar al resumen
            navigation.navigate('order-summary');
          },
        },
        {text: 'Cancelar', style: 'destructive'},
      ],
    );
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleOrder}>Cantidad</Text>
      <View style={styles.btnGroup}>
        <Button
          compact
          labelStyle={styles.btnRemove}
          icon="numeric-negative-1"
          mode="outlined"
          color="#F1C40F"
          onPress={() => decrease()}>
          <Text>Remover</Text>
        </Button>
        <View>
          <Surface style={styles.surface}>
            <Text style={styles.amount}>{amount}</Text>
          </Surface>
        </View>
        <Button
          compact
          labelStyle={styles.btnAdd}
          icon="numeric-positive-1"
          mode="contained"
          color="#ECF0F1"
          onPress={() => setAmount(amount + 1)}>
          <Text>Agregar</Text>
        </Button>
      </View>
      <Divider inset style={globalStyles.divider} />
      <View>
        <Text style={globalStyles.titleOrder}>Subtotal: ${total}</Text>
      </View>
      <View style={styles.footer}>
        <Button mode="contained" onPress={() => confirmOrder()} color="#F1C40F">
          Agregar al pedido
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnRemove: {
    color: '#5D6D7E',
  },
  btnAdd: {
    color: '#2E4053',
  },
  textInput: {
    height: 30,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  surface: {
    height: 35,
    width: 35,
    backgroundColor: '#F9E79F',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
