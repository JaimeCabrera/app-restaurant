import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import {Avatar, Divider, List} from 'react-native-paper';
// import globalStyles from '../../styles/globalStyles';
// lodash para

export const MenuScreen = () => {
  const {getAllProducts, menu} = useContext(FirebaseContext);

  useEffect(() => {
    getAllProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showHeading = (category, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;

      if (categoriaAnterior !== category) {
        return (
          <>
            <Divider style={styles.divider} inset={false}>
              <Text style={styles.textDivider}>{category}</Text>
            </Divider>
          </>
        );
      }
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        data={menu}
        keyExtractor={dish => dish.id.toString()}
        renderItem={({item, index}) => {
          return (
            <>
              {showHeading(item.categoria, index)}
              <List.Item
                style={styles.itemList}
                title={item.nombre}
                // titleNumberOfLines={1}
                description={item.descripcion}
                onPress={() => {}}
                left={props => (
                  <Avatar.Image size={64} source={{uri: item.imagen}} />
                )}
                right={props => (
                  <Text style={styles.price}>${item.precio}</Text>
                )}
              />
            </>
          );
        }}
      />
      {/* <Text>MenuScreen {JSON.stringify(menu)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 10,
  },
  divider: {
    color: '#FDFEFE',
    backgroundColor: '#FDFEFE',
    height: 30,
  },
  textDivider: {
    paddingLeft: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 6,
    fontSize: 16,
    color: '#F1C40F',
  },
  itemList: {
    paddingHorizontal: 16,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginEnd: 17,
    marginTop: 10,
  },
});
