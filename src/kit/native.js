import { NativeModules, NativeAppEventEmitter } from 'react-native';
import Language from '../Language';
import store from '../redux/store';
import actions from '../redux/actions';

const NativeManager = NativeModules.NativeManager;

const native = {
  share: function(type) {
    NativeManager.share(type, Language.datas.shareTitle, Language.datas.shareText, Language.datas.shareUrl);
  },
  isInstall: function(type, callback) {
    NativeManager.isInstall(type, callback);
  },
  initKtplay: function() {
    NativeManager.isKtplayEnable((arr) => {
      if ( arr ) {
        store.dispatch(actions.enableKtplay(1));
      } else {
        store.dispatch(actions.enableKtplay(0));
        NativeAppEventEmitter.addListener(
          'KTPLAY_ENABLE',
          (isEnable) => {
            store.dispatch(actions.enableKtplay(isEnable));
          }
        );
      }
    });
  },
  showKtplay: function() {
    NativeManager.showKtplay(1);
  }
};

native.initKtplay();

export default native;
