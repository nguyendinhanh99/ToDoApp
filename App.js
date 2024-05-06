import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './Navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </Provider>
  );
}