import React, {useContext} from 'react';
import {View} from 'react-native';
import {
  Button,
  Card,
  Divider,
  Headline,
  Paragraph,
  Title,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../../styles/globalStyles';
import OrdersContext from '../context/orders/ordersContext';

export const DetailDishScreen = () => {
  // obteniedno el platillo del reducer
  const {dish} = useContext(OrdersContext);
  const {nombre, imagen, descripcion, precio} = dish;
  // redireccionar al formulario para el pedido
  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Headline style={globalStyles.titleOrder}>{nombre}</Headline>
        <Card>
          <Card.Cover source={{uri: imagen}} />
          <Card.Content>
            <Title>Descripción</Title>
            <Paragraph>{descripcion}</Paragraph>
            <Title>Precio</Title>
            <Paragraph style={globalStyles.productPrice}>${precio}</Paragraph>
          </Card.Content>
          <Divider />
          <Card.Actions style={globalStyles.floatEnd}>
            <Button
              onPress={() => navigation.navigate('dish-form')}
              color="#F1C40F"
              labelStyle="#34495E"
              mode="contained">
              Ordenar Platillo
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
};
