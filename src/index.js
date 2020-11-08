import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SettingProvider } from './states/useSettings';
import { GlobalProvider } from './states/useStore';

ReactDOM.render(
  <React.StrictMode>
    <SettingProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </SettingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
