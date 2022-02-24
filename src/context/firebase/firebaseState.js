import React, {useReducer, useState} from 'react';
import {db, query, onSnapshot, where, collection} from '../../firebase';
import {GET_PRODUCTS} from '../../../types';

import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseState = props => {
  const [tasks, setTasks] = useState([]);
  // crear uns atate inicial
  const initialState = {
    menu: [],
  };
  // use reducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);
  // funcion que se ejecuta para traer los productos
  const getAllProducts = () => {
    dispatch({
      type: GET_PRODUCTS,
    });
    //para tener cambios en tiuempo real
    // const platillosRef = collection(db, 'platillos');
    // Create a query against the collection.
    const q = query(
      collection(db, 'platillos'),
      where('existencia', '==', true),
    );
    onSnapshot(q, querySnapshot => {
      setTasks(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  };

  console.log(tasks);

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
