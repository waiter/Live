import Icon from 'react-native-vector-icons/MaterialIcons';
import Constant from '../constant';

const iconSize = Constant.size.topBarImg * 2;
const topColor = Constant.colors.topBarImg;
const iconColor = Constant.colors.iconColor;

const img = {
  _init: function() {
    return new Promise(async (resolve, reject) => {
      try {
        img.add = await Icon.getImageSource('add', iconSize, topColor);
        img.done = await Icon.getImageSource('done', iconSize, topColor);
        img.arrowBack = await Icon.getImageSource('navigate-before', iconSize, topColor);
        img.swap = await Icon.getImageSource('swap-horiz', iconSize, topColor);

        img.email = await Icon.getImageSource('email', iconSize, iconColor);
        img.favorite = await Icon.getImageSource('favorite', iconSize, iconColor);
        img.cake = await Icon.getImageSource('cake', iconSize, iconColor);
        img.notifications = await Icon.getImageSource('notifications', iconSize, iconColor);
        img.person = await Icon.getImageSource('person', iconSize, iconColor);
        img.home = await Icon.getImageSource('home', iconSize, iconColor);
        img.fitness = await Icon.getImageSource('fitness-center', iconSize, iconColor);
        img.toys = await Icon.getImageSource('toys', iconSize, iconColor);
        img.florist = await Icon.getImageSource('local-florist', iconSize, iconColor);
        img.audiotrack = await Icon.getImageSource('audiotrack', iconSize, iconColor);
        img.camera = await Icon.getImageSource('camera-alt', iconSize, iconColor);
        img.breakfast = await Icon.getImageSource('free-breakfast', iconSize, iconColor);

        img.create = await Icon.getImageSource('create', iconSize, topColor);
        img.delete = await Icon.getImageSource('delete-forever', iconSize, topColor);
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  },
};

export default img;
