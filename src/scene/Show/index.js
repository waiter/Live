import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-carousel';
import Constant from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';

class Show extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          indicatorAtBottom
          loop
          animate
          delay={10000}
          indicatorOffset={30}
          indicatorSize={Constant.size.topBarImg}
          indicatorSpace={Constant.size.topBarImg/2}
        >
          <View style={styles.itemView}>
            <Text>重要日子</Text>
            <Text>2016-09-28</Text>
            <Progress.Circle size={150} thickness={10} progress={0.8}/>
            <Text>7777</Text>
            <Text>已过</Text>
          </View>
          <View style={styles.itemView}>
            <Text>重要日子</Text>
            <Text>2016-09-28</Text>
            <Progress.Circle size={150} thickness={10} progress={0.8}/>
            <Text>5565</Text>
            <Text>已过</Text>
          </View>
          <View style={styles.itemView}>
            <Text>重要日子</Text>
            <Text>2016-09-28</Text>
            <Progress.Circle size={150} thickness={10} progress={0.8}/>
            <Text>2233</Text>
            <Text>已过</Text>
          </View>
        </Carousel>
        <TouchableOpacity
          style={styles.closeView}
          activeOpacity={0.9}
          onPress={_ => Actions.pop()}>
          <Icon name="close" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareView}
          activeOpacity={0.9}
          onPress={_ => Actions.pop()}>
          <Icon name="share" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.colors.item,
  },
  itemView: {
    // flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // borderWidth: 3,
    // borderColor: '#f00'
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView: {
    // flex: 1,
    left: 0,
    bottom: 0,
    right: 0,
    // alignSelf: 'flex-end',
    height: 100,
    borderWidth: 3,
    borderColor: '#000',
    position: 'absolute'
  },
  closeView: {
    position: 'absolute',
    left: Constant.size.editHeight / 2,
    bottom: Constant.size.editHeight / 3,
    width: Constant.size.editHeight,
    height: Constant.size.editHeight,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: '#000'
  },
  shareView: {
    position: 'absolute',
    right: Constant.size.editHeight / 2,
    bottom: Constant.size.editHeight / 3,
    width: Constant.size.editHeight,
    height: Constant.size.editHeight,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: '#000'
  },
});

export default Show;
