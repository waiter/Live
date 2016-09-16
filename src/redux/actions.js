import ActionKeys from './actionKeys';

export default {
  startLoading: function() {
    return {
      type: ActionKeys.START_LOADING
    };
  },
  startLoadingEnd: function(text) {
    return {
      type: ActionKeys.START_LOADING_END,
      text,
    };
  },
  eventInitDatas: function(data) {
    return {
      type: ActionKeys.EVENT_INIT_DATAS,
      data,
    }
  },
  eventRestData: function(data) {
    return {
      type: ActionKeys.EVENT_RESET_DATA,
      data,
    }
  }
};
