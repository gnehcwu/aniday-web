import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { SettingProvider } from './states/useSetting';
import { StoreProvider } from './states/useStore';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/short-stack';
import theme from './theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </StoreProvider>
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
