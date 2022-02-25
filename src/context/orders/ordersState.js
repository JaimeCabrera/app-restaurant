import React, {useReducer} from 'react';
import {SELECT_PRODUCT} from '../../../types';
import OrderContext from './ordersContext';
import OrdersReducer from './ordersReducer';

const OrdersState = props => {
  const initialState = {
    order: [],
    dish: null,
  };
  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  // creaer uan funcion que guarda el producto que usuario selecciona
  const selectDish = dish => {
    // console.log(dish);
    dispatch({
      type: SELECT_PRODUCT,
      payload: dish,
    });
  };
  // cunado el usuario confrima un platillo de
  const saveOrder = order => {
    dispatch({
      type: 'CONFIRM_ORDER_DISH',
      payload: order,
    });
  };
  return (
    <OrderContext.Provider
      value={{pedido: state.pedido, selectDish, dish: state.dish, saveOrder}}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrdersState;
