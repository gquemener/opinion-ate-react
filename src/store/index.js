import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import api from '../api';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))),
);

export default store;
