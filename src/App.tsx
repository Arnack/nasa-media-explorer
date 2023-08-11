import './App.css';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';

const chakraTheme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ChakraProvider>
  );
}

export default App;
