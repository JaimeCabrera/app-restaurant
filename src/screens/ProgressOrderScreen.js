import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import OrdersContext from '../context/orders/ordersContext';
import {db, doc, onSnapshot} from '../firebase';

export const ProgressOrderScreen = () => {
  const [order, setOrder] = useState();
  const [time, setTime] = useState(0);
  const {idOrder} = useContext(OrdersContext);

  useEffect(() => {
    const getProduct = async () => {
      onSnapshot(doc(db, 'orders', idOrder), doc1 => {
        // console.log('Current data: ', doc1.data());
        setOrder(doc1.data());
        setTime(doc1.data().deliveryTime);
      });
      // console.log('unsub', unsub);
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <Text>
        ProgressOrderScreen {JSON.stringify(order)} {time}
      </Text>
    </View>
  );
};
