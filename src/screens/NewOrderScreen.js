import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';

export const NewOrderScreen = () => {
  // hook para la navegacion
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <View style={styles.content}>
        <Button
          mode="outlined"
          compact
          color="#2C3E50"
          onPress={() => navigation.navigate('menu')}
          style={globalStyles.btnPrimary}>
          Crear Nueva Orden
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
