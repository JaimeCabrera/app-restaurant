import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import globalStyles from '../../styles/globalStyles';
import FirebaseContext from '../context/firebase/firebaseContext';
import OrdersContext from '../context/orders/ordersContext';

// lodash para

export const MenuScreen = () => {
  // context de firebase
  const {getAllProducts, menu} = useContext(FirebaseContext);
  // context de order
  const {selectDish} = useContext(OrdersContext);
  const navigation = useNavigation();

  useEffect(() => {
    getAllProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // para ver los platillos agrupados por categoria
  const showHeading = (category, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;

      if (categoriaAnterior !== category) {
        return (
          <>
            <Divider style={styles.divider} inset={false}>
              <Text style={styles.textDivider}>{category}</Text>
            </Divider>
          </>
        );
      }
    } else {
      return (
        <>
          <Divider style={styles.divider} inset={false}>
            <Text style={styles.textDivider}>{category}</Text>
          </Divider>
        </>
      );
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        data={menu}
        keyExtractor={dish => dish.id.toString()}
        renderItem={({item, index}) => {
          return (
            <>
              {showHeading(item.categoria, index)}

              <List.Item
                style={styles.itemList}
                title={item.nombre}
                // titleNumberOfLines={1}
                description={item.descripcion}
                onPress={() => {
                  // eliminar alguna propiedades del platillo
                  const {existencia, ...dish2} = item;
                  selectDish(dish2);
                  navigation.navigate('dish-details');
                }}
                left={props => (
                  <Avatar.Image size={64} source={{uri: item.imagen}} />
                )}
                right={props => (
                  <Text style={styles.price}>${item.precio}</Text>
                )}
              />
            </>
          );
        }}
      />
      {/* <Text>MenuScreen {JSON.stringify(menu)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 2,
  },
  divider: {
    color: '#F4D03F',
    backgroundColor: '#D7DBDD',
    height: 30,
  },
  textDivider: {
    paddingLeft: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 6,
    fontSize: 16,
    color: '#B7950B',
  },
  itemList: {
    paddingHorizontal: 16,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginEnd: 17,
    marginTop: 10,
  },
});
