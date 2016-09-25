import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../constant';

const iconSize = Constant.size.topBarImg * 2;
const topColor = Constant.colors.topBarImg;
const iconColor = Constant.colors.iconColor;

const img = {
  _init: function() {
    return new Promise(async (resolve, reject) => {
      try {
        img.add = await Icon.getImageSource('md-add', iconSize, topColor);
        img.checkmark = await Icon.getImageSource('md-checkmark', iconSize, topColor);
        img.arrowBack = await Icon.getImageSource('md-arrow-back', iconSize, topColor);
        img.swap = await Icon.getImageSource('md-swap', iconSize, topColor);

        img.alarm = await Icon.getImageSource('md-alarm', iconSize, iconColor);
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  },
};

export default img;
