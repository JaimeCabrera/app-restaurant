import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import {Avatar, List} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';

export const MenuScreen = () => {
  const {getAllProducts, menu} = useContext(FirebaseContext);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={menu}
        keyExtractor={dish => dish.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            titleNumberOfLines={1}
            description={item.descripcion}
            onPress={() => {}}
            left={props => (
              <Avatar.Image size={56} source={{uri: item.imagen}} />
            )}
            right={props => <Text>${item.precio}</Text>}
          />
        )}
      />
      {/* <Text>MenuScreen {JSON.stringify(menu)}</Text> */}
    </View>
  );
};
