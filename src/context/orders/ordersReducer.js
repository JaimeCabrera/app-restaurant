import {
  CONFIRM_ORDER_DISH,
  DELETE_ITEM_ORDER,
  ORDER_CONFIRMED,
  SELECT_PRODUCT,
  SHOW_SUMMARY,
} from '../../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        dish: action.payload,
      };
    case CONFIRM_ORDER_DISH:
      return {
        ...state,
        // puede ser que el pedidom ya tenga algo en el state entonces se le agrega eso mas lo que viene en el payload
        order: [...state.order, action.payload],
      };
    case SHOW_SUMMARY:
      return {
        ...state,
        total: action.payload,
      };
    case DELETE_ITEM_ORDER:
      return {
        ...state,
        order: state.order.filter(item => item.id !== action.payload),
      };
    case ORDER_CONFIRMED:
      return {
        ...state,
        idOrder: action.payload,
      };
    default:
      return state;
  }
};
