import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './components/redux/reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

);
ReactDOM.render(
 <Provider store={store} >
   <App />
 </Provider>, document.getElementById('root'));
registerServiceWorker();
