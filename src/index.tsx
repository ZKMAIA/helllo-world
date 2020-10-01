import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import http from './utils/http'
import { Provider } from 'react-redux'
import store from './redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

