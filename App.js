import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screens
import {NewOrderScreen} from './src/screens/NewOrderScreen';
import {MenuScreen} from './src/screens/MenuScreen';
import {DetailDishScreen} from './src/screens/DetailDishScreen';
import {FormDishScreen} from './src/screens/FormDishScreen';
import {SummaryOrderScreen} from './src/screens/SummaryOrderScreen';
import {ProgressOrderScreen} from './src/screens/ProgressOrderScreen';
// context
import FirebaseState from './src/context/firebase/firebaseState';
import OrdersState from './src/context/orders/ordersState';
// react paper
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <FirebaseState>
      <OrdersState>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                // headerStyle: {
                //   backgroundColor: '#F1C40F',
                // },
                headerTitleStyle: {
                  fontWeight: '300',
                },
                headerTintColor: '#808B96',
              }}>
              <Stack.Screen
                name="order-new"
                component={NewOrderScreen}
                options={{title: 'Nueva Orden'}}
              />
              <Stack.Screen
                name="menu"
                component={MenuScreen}
                options={{title: 'Menú'}}
              />
              <Stack.Screen
                name="dish-details"
                component={DetailDishScreen}
                options={{title: 'Detaller platillo'}}
              />
              <Stack.Screen
                name="dish-form"
                component={FormDishScreen}
                options={{title: 'Ordenar Paltillo'}}
              />
              <Stack.Screen
                name="order-summary"
                component={SummaryOrderScreen}
                options={{title: 'Resumen pedido'}}
              />
              <Stack.Screen
                name="order-progress"
                component={ProgressOrderScreen}
                options={{title: 'Progreso pedido'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </OrdersState>
    </FirebaseState>
  );
};
export default App;
