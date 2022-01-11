import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import history from './utils/history.js';
import './index.css';
import App from './Components/App';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history} location={history.location} navigator={history}>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
