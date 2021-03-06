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
  eventRestData: function() {
    return {
      type: ActionKeys.EVENT_RESET_DATA
    }
  }
};
