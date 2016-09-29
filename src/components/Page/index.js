import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Constant from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {icon, title, time, years, per, days, addition} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Icon name={icon} size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
          <Text>{time}</Text>
        </View>
        <View style={styles.middleView}>
          <View style={styles.yearView}>
            <Text style={styles.yearText}>{years}</Text>
          </View>
          <Progress.Circle
            size={Constant.size.circle}
            progress={per}
            thickness={10}
            color={Constant.colors.iconColor}
            />
        </View>
        <View style={styles.bottomView}>
          <Text numberOfLines={1} style={styles.countText}>{days}</Text>
          <Text>{addition}</Text>
        </View>
      </View>
    );
  }
}

Page.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
  years: React.PropTypes.string.isRequired,
  per: React.PropTypes.number.isRequired,
  days: React.PropTypes.number.isRequired,
  addition: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topView: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  middleView: {
    height: Constant.size.circle,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  countText: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  yearView: {
    top: (Constant.size.circle - Constant.size.circleWordSize) / 2,
    left: (Dimensions.get('window').width - Constant.size.circleWord)  / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Constant.size.circleWord,
    height: Constant.size.circleWordSize,

  },
  yearText: {
    fontSize: Constant.size.circleWordSize,
    fontWeight: 'bold',
  }
});

export default Page;
