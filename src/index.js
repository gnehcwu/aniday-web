import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { SettingProvider } from './states/useSetting';
import { StoreProvider } from './states/useStore';
import ThemeWrapper from './components/ThemeWrapper';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <StoreProvider>
        <ThemeWrapper />
      </StoreProvider>
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
