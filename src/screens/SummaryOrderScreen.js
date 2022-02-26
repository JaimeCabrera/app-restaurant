import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Alert} from 'react-native';
import {Avatar, Button, List} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import OrdersContext from '../context/orders/ordersContext';
// import afirebase from
import {db, addDoc, setDoc, collection} from '../firebase/index';

export const SummaryOrderScreen = () => {
  // context de orden
  const {order, total, showTotal, deleteItemOrder, orderConfirmed} =
    useContext(OrdersContext);
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
  // }funcion que redireccionar a progreso de pedido de
  const orderProgress = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realices el pedido no podras cancelarlo',
      [
        {
          text: 'Confirmar pedido',
          onPress: async () => {
            // crea un obejto con la info de la orden de
            const orderToSaveFirebase = {
              deliveryTime: 0,
              completed: false,
              total: Number(total),
              order,
              created: Date.now(),
            };

            // console.log(orderToSaveFirebase);
            // escribir en firebase
            try {
              const resp = await addDoc(
                collection(db, 'orders'),
                orderToSaveFirebase,
              );
              console.log('aca', resp.id);
              orderConfirmed(resp.id);
              navigation.navigate('order-progress');

              // console.log(resp);
            } catch (error) {
              console.error(error);
            }
          },
          style: 'default',
        },
        {text: 'Revisar', style: 'cancel'},
      ],
    );
    // navigation.navigate('order-progress');
  };
  // para remover un item del pedido del
  const confirmRemoveItem = id => {
    Alert.alert(
      '¿Deseas eliminar este articulo?',
      'Puedes volver a agregarlo desde nuestro menu',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // eliminar del state
            deleteItemOrder(id);
            // calcular
          },
          style: 'default',
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.titleOrder}>Resumen del Pedido</Text>
      <FlatList
        style={styles.flatList}
        data={order}
        renderItem={({item}) => {
          // console.log('este es el index', i);
          const uid = new Date().getTime();
          console.log(uid);
          return (
            <List.Item
              key={uid}
              style={styles.itemList}
              title={item.nombre}
              description={`Cantidad: ${item.cantidad}`}
              left={props => (
                <Avatar.Image size={64} source={{uri: item.imagen}} />
              )}
              right={props => (
                <View style={styles.listRigth}>
                  <Text style={styles.price}>Precio: ${item.precio}</Text>
                  <Button
                    onPress={() => confirmRemoveItem(item.id)}
                    mode="text"
                    compact
                    color="#E74C3C">
                    Quitar
                  </Button>
                </View>
              )}
            />
          );
        }}
      />

      <Text style={globalStyles.titleOrder}>Total a pagar: ${total}</Text>
      <Button
        color="#F1C40F"
        mode="contained"
        style={styles.btnMenu}
        onPress={() => navigation.navigate('menu')}>
        Seguir pidiendo
      </Button>
      <Button
        color="#283747"
        mode="outlined"
        style={styles.btnOrder}
        onPress={() => orderProgress()}>
        Ordenar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginHorizontal: 20,
  },
  flatList: {
    flex: 4,
    // height: '55%',
  },
  btnOrder: {
    marginBottom: 15,
    marginTop: 70,
    marginHorizontal: 20,
  },
  listRigth: {
    flexDirection: 'column',
  },
});
