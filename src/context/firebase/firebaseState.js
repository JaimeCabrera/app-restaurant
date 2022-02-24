import React, {useReducer, useState} from 'react';
import {GET_PRODUCTS} from '../../../types';
import {
  firebase,
  db,
  query,
  onSnapshot,
  where,
  collection,
} from '../../firebase';

import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseState = props => {
  const [tasks, setTasks] = useState([]);
  // crear uns atate inicial
  const initialStte = {
    menu: [],
  };
  // use reducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialStte);
  // funcion que se ejecuta para traer los productos
  const getAllProducts = () => {
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

    // consultar a firebase
  };
  // dispatch({
  //   type: GET_PRODUCTS,
  // });
  console.log(tasks);

  return (
    <FirebaseContext.Provider
      value={{menu: state.menu, firebase, getAllProducts}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
