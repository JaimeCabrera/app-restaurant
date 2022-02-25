import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Avatar, Button, List} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import OrdersContext from '../context/orders/ordersContext';

export const SummaryOrderScreen = () => {
  // context de orden
  const {order, total, showTotal} = useContext(OrdersContext);
  // hook de navegacion
  const navigation = useNavigation();
  useEffect(() => {
    calcularTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = order.reduce(
      (newTotal, articulo) => newTotal + articulo.total,
      0,
    );
    // console.log(nuevoTotal);
    showTotal(nuevoTotal);
  };

  return (
    <View>
      <Text style={globalStyles.titleOrder}>Resumen del Pedido</Text>
      <FlatList
        style={styles.flatList}
        data={order}
        renderItem={({item, i}) => {
          console.log(i);
          return (
            <List.Item
              key={item.id + i}
              style={styles.itemList}
              title={item.nombre}
              description={`Cantidad: ${item.cantidad}`}
              left={props => (
                <Avatar.Image size={64} source={{uri: item.imagen}} />
              )}
              right={props => (
                <Text style={styles.price}>Precio: ${item.precio}</Text>
              )}
            />
          );
        }}
      />

      {/* {order.map((platillo, i) => {
        const {cantidad, nombre, imagen, precio, id} = platillo;
        return (
          <>
            <List.Item
              key={id + i}
              style={styles.itemList}
              title={nombre}
              description={`Cantidad: ${cantidad}`}
              left={props => <Avatar.Image size={64} source={{uri: imagen}} />}
              right={props => (
                <Text style={styles.price}>Precio: ${precio}</Text>
              )}
            />
          </>
        );
      })} */}
      <Text style={globalStyles.titleOrder}>Total a pagar: ${total}</Text>
      <Button
        color="#F1C40F"
        mode="outlined"
        style={styles.btnMenu}
        onPress={() => navigation.navigate('menu')}>
        Seguir pidiendo
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: '#FDFEFE',
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 14,
  },
  btnMenu: {
    marginHorizontal: 40,
  },
  flatList: {
    height: '70%',
  },
});
