import { NativeModules } from 'react-native';

const NativeManager = NativeModules.NativeManager;

export default {
  share: function() {
    NativeManager.share('beij', 'uiay');
  }
};
