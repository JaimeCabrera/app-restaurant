import React, {useReducer} from 'react';
import {SELECT_PRODUCT, CONFIRM_ORDER_DISH, SHOW_SUMMARY} from '../../../types';
import OrderContext from './ordersContext';
import OrdersReducer from './ordersReducer';

const OrdersState = props => {
  const initialState = {
    order: [],
    dish: null,
    total: 0,
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
      type: CONFIRM_ORDER_DISH,
      payload: order,
    });
  };
  // crea funcion par mostrar el troal a pagar en el resumen
  const showTotal = total => {
    dispatch({
      type: SHOW_SUMMARY,
      payload: total,
    });
  };
  return (
    <OrderContext.Provider
      value={{
        // pedido: state.pedido,
        order: state.order,
        selectDish,
        dish: state.dish,
        saveOrder,
        total: state.total,
        showTotal,
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrdersState;
