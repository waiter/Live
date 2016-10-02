import { combineReducers } from 'redux';
import ActionKeys from './actionKeys';
import Events from '../data/events';
import ADManager from '../data/adManager';

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
      const da = Events.getCurrentDatas();
      const ids = Array.from(da.ids);
      const datas = Object.assign({}, da.datas);
      if (ADManager.isReady) {
        const vk = 'video';
        const vd = {
          isAd: true,
          title: 'xxx',
          time: 'xxxx',
          iconId: 12,
        };
        datas[vk] = vd;
        ids.unshift(vk);
      }
      return {
        ...state,
        ids,
        datas,
      };
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  events,
});
