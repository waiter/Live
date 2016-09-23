import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../constant';

const img = {
  _init: function() {
    return new Promise(async (resolve, reject) => {
      try {
        img.add = await Icon.getImageSource('md-add', 22, Constant.colors.topBarImg);
        img.checkmark = await Icon.getImageSource('md-checkmark', 22, Constant.colors.topBarImg);
        img.arrowBack = await Icon.getImageSource('md-arrow-back', 22, Constant.colors.topBarImg);
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  },
};

export default img;
