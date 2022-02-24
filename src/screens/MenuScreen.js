import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';

export const MenuScreen = () => {
  const {getAllProducts} = useContext(FirebaseContext);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text>MenuScreen</Text>
    </View>
  );
};
