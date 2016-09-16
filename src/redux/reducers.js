import { combineReducers } from 'redux';
import ActionKeys from './actionKeys';

function loading(state = {loading: true, text: ''}, action = {}) {
  switch (action.type) {
    case ActionKeys.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionKeys.START_LOADING_END:
      return {
        ...state,
        loading: false,
        text: action.text
      };
    default:
      return state;
  }
}

function events(state = {
  ids: [],
  datas: {}
}, action = {}) {
  switch (action.type) {
    case ActionKeys.EVENT_INIT_DATAS:
    case ActionKeys.EVENT_RESET_DATA:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  events,
});
