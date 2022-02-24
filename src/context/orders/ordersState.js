import React, {useReducer} from 'react';
import OrderContext from './ordersContext';
import OrdersReducer from './ordersReducer';

const OrdersState = props => {
  const initialState = {
    order: [],
  };
  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  return (
    <OrderContext.Provider value={{pedido: state.pedido}}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrdersState;
