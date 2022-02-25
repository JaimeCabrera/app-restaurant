import React, {useReducer} from 'react';
import {db, query, onSnapshot, where, collection} from '../../firebase';
import {GET_PRODUCTS_SUCCESS} from '../../../types';

import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';
// lodash para
import _ from 'lodash';

const FirebaseState = props => {
  // crear uns atate inicial
  const initialState = {
    menu: [],
  };
  // use reducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);
  // funcion que se ejecuta para traer los productos
  // const getAllProducts = () => {
  //   //para tener cambios en tiuempo real
  //   // const platillosRef = collection(db, 'platillos');
  //   // Create a query against the collection.

  const getAllProducts = () => {
    const q = query(
      collection(db, 'platillos'),
      where('existencia', '==', true),
    );
    onSnapshot(q, querySnapshot => {
      let platillos = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // con let puedo acceder desde fuera de la funcion de la
      // ordenar por categtoria con lodash
      platillos = _.sortBy(platillos, 'categoria');

      // console.log('platillos', platillos);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: platillos,
      });
    });
  };

  // aca se deben pasar lo0s metodos de firebase para que esten en toda la app
  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        db,
        query,
        onSnapshot,
        where,
        collection,
        getAllProducts,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
