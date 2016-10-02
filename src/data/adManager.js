import {AdMobInterstitial} from 'react-native-admob';

const ad = {
  keys: {
    home: 'ca-app-pub-5825705564244333/4820766406',
    video: 'ca-app-pub-5825705564244333/5599495601'
  },
  // testDeviceID: '09a3ce0d7115b4bb4481cdb0d159c5b9addc149c',
  testDeviceID: 'EMULATOR',
  isReady: false,
  isChecking: false,
  init: function() {
    AdMobInterstitial.setTestDeviceID(ad.testDeviceID);
    AdMobInterstitial.setAdUnitID(ad.keys.video);
    // AdMobInterstitial.addEventListener('interstitialDidClose', ad.interstitialDidClose);
    ad.interstitialDidClose();
  },
  interstitialDidClose: function() {
    AdMobInterstitial.requestAd((error) => {
      ad.checkReady();
    });
  },
  checkReady: function(force) {
    if ((!ad.isReady && !ad.isChecking) || force) {
      ad.isChecking = true;
      AdMobInterstitial.isReady((bool) => {
        ad.isReady = bool;
        ad.isChecking = false;
      });
    }
  },
  showAd: function() {
    AdMobInterstitial.showAd(ad.interstitialDidClose);
  }
};

export default ad;
