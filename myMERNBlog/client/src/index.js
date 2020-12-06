import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';//Step-113
import {Provider} from 'react-redux'; //Step-123
import {createStore, applyMiddleware} from 'redux';//Step-124
import promiseMiddleware from 'redux-promise';//Step-125
import reduxThunk from 'redux-thunk'; //Step-126
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
                          applyMiddleware(promiseMiddleware,reduxThunk));//Step-135

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} /> {/**Step-135 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
