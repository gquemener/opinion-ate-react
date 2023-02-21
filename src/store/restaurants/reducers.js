import {combineReducers} from 'redux';
import {ERROR_LOADING, START_LOADING, STORE_RESTAURANTS} from './actions';

function records(state = [], action) {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;

    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case START_LOADING:
      return true;

    case STORE_RESTAURANTS:
    case ERROR_LOADING:
      return false;

    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case ERROR_LOADING:
      return true;

    default:
      return state;
  }
}

export default combineReducers({
  records,
  loading,
  error,
});
