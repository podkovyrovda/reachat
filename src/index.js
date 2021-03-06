import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer'

import App from './App';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
);


