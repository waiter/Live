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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import Page from '../../components/Page';
import Util from '../../kit/util';
import NativeManager from '../../kit/native';
import BindComponent from '../../components/BindComponent';

class Show extends BindComponent {
  constructor(props) {
    super(props, ['renderShare', 'share']);
    this.words = Util.makeWord(props.rowData);
    this.state = {
      showShare: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.words = Util.makeWord(newProps.rowData);
  }

  share(type) {
    this.setState({
      showShare: false,
    });
    NativeManager.share(type);
  }

  renderShare() {
    if (this.state.showShare) {
      return (
        <View style={styles.shareViewsOpen}>
          <TouchableOpacity
            style={styles.shareBtn}
            activeOpacity={0.9}
            onPress={_ => this.share(Constant.shareTypes.WechatSession)}
          >
            <IconFontAwesome name="weixin" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareBtn}
            activeOpacity={0.9}
            onPress={_ => this.share(Constant.shareTypes.WechatTimeline)}
          >
            <IconFontAwesome name="chrome" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareBtn}
            activeOpacity={0.9}
            onPress={_ => this.share(Constant.shareTypes.Facebook)}
          >
            <IconFontAwesome name="facebook" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareBtn}
            activeOpacity={0.9}
            onPress={_ => this.setState({showShare: false})}
          >
            <Icon name="close" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.shareView}
          activeOpacity={0.9}
          onPress={_ => this.setState({showShare: true})}>
          <Icon name="share" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const rowData = this.props.rowData;
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
          <Page
            icon={Constant.iconWords[rowData.iconId || 0]}
            title={rowData.title}
            time={rowData.time}
            years="∞"
            per={1}
            days={`${this.words[1][1]}`}
            addition={this.words[1][0]}
          />
          <Page
            icon={Constant.iconWords[rowData.iconId || 0]}
            title={rowData.title}
            time={rowData.time}
            years={`${rowData.baseYear}`}
            per={1.0 * rowData.diffDays / (rowData.diffDays + rowData.baseDiff)}
            days={`${this.words[2][1]}`}
            addition={this.words[2][0]}
          />
          <Page
            icon={Constant.iconWords[rowData.iconId || 0]}
            title={rowData.title}
            time={rowData.time}
            years={`${rowData.newYearPer * 10 * (rowData.is29 ? 2 : 1)}`}
            per={1.0 * rowData.diffDays / (rowData.diffDays + rowData.newDiff)}
            days={`${this.words[3][1]}`}
            addition={this.words[3][0]}
          />
        </Carousel>
        <TouchableOpacity
          style={styles.closeView}
          activeOpacity={0.9}
          onPress={_ => Actions.pop()}>
          <Icon name="close" size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
        </TouchableOpacity>
        {this.renderShare()}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView: {
    left: 0,
    bottom: 0,
    right: 0,
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
  },
  shareView: {
    position: 'absolute',
    right: Constant.size.editHeight / 2,
    bottom: Constant.size.editHeight / 3,
    width: Constant.size.editHeight,
    height: Constant.size.editHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareViewsOpen: {
    position: 'absolute',
    right: Constant.size.editHeight / 2,
    bottom: Constant.size.editHeight / 3,
    width: Constant.size.editHeight,
    height: Constant.size.editHeight * 4,
  },
  shareBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Show;
