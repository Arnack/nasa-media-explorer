import './App.css';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react";

const themeConfig = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

const theme = extendTheme({ themeConfig })

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
