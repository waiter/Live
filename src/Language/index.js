import DeviceInfo from 'react-native-device-info';
import en from './en';
import zhHans from './zh-hans';
import zhHant from './zh-hant';

console.log("Device Locale", DeviceInfo.getDeviceLocale());
// en zh-hans zh-hant

const lan = {
  init: function() {
    const ll = DeviceInfo.getDeviceLocale().toLowerCase();
    console.log(ll);
    if (ll.indexOf('zh-hans') > -1) {
      console.log('簡體啊為什麼....');
      lan.datas = Object.assign({}, en, zhHans);
    } else if (ll.indexOf('zh-hant') > -1) {
      lan.datas = Object.assign({}, en, zhHant);
    }
  },
  datas: en,
};

export default lan;
