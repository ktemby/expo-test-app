import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigators/BottomTabNav';

export default function App() {

  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}
