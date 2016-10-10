import { NativeModules } from 'react-native';
import Language from '../Language';

const NativeManager = NativeModules.NativeManager;

const native = {
  share: function(type) {
    NativeManager.share(type, Language.datas.shareTitle, Language.datas.shareText, Language.datas.shareUrl);
  },
  isInstall: function(type, callback) {
    NativeManager.isInstall(type, callback);
  }
};

export default native;
