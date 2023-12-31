import './App.css';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
    colorMode: "dark",
};

const theme = extendTheme({ config })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ChakraProvider>
  );
}

export default App;
