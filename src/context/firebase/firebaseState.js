import React, {useReducer} from 'react';
import {db, query, onSnapshot, where, collection} from '../../firebase';
import {GET_PRODUCTS_SUCCESS} from '../../../types';

import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

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
      // console.log('platillos', platillos);
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: platillos,
      });
    });
  };

  // const getAllProducts = () => {
  //   //para tener cambios en tiuempo real
  //   onSnapshot(
  //     collection(db, 'platillos'),
  //     snapshot => {
  //       const platillos = snapshot.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       });
  //       // console.log(platillos);
  //       // alamacenar los resultado en el state
  //       console.log('platillos', platillos);
  //       dispatch({
  //         type: GET_PRODUCTS_SUCCESS,
  //         payload: platillos,
  //       });
  //       // console.log("Current data: ", snapshot.docs.map);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //   );
  // };
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
