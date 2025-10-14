import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './navigation/index.routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}