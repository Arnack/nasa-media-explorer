import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ChakraProvider>
  );
}

export default App;
