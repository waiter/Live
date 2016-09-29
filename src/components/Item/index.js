import React from 'react';
import BindComponent from '../BindComponent';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Constant from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Util from '../../kit/util';

const pad = 8;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftWidth: 6,
  },
  itemLeft: {
    flex: 1,
    padding: pad,
    paddingLeft: 0,
    justifyContent: 'space-between'
  },
  itemLeftText: {
    fontSize: 20,
    color: Constant.colors.word,
    fontWeight: 'bold'
  },
  smallText: {
    fontSize: 12,
    color: Constant.colors.iconColor,
  },
  itemRightText: {
    fontSize: 10
  },
  itemRight: {
    maxWidth: 100,
    padding: pad,
    paddingLeft: 0,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  icon: {
    width: Constant.size.topBarImg,
    height: Constant.size.topBarImg
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },
  contentView: {
    backgroundColor: Constant.colors.item,
    flex: 1,
    flexDirection: 'row',
    height: Constant.size.itemHeight,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line
  }
});

export default class Item extends BindComponent {
  constructor(props) {
    super(props, []);
    const len = Constant.colors.kitList.length;
    const cId = parseInt(len * Math.random(), 10);
    this.color = Constant.colors.kitList[cId];
    this.words = Util.makeWord(props.rowData);
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.rowData) != JSON.stringify(this.props.rowData)) {
      this.words = Util.makeWord(newProps.rowData);
    }
  }

  render() {
    const {rowData, onPress, showType} = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
      <View style={[styles.item, {borderLeftColor: this.color}]}>
        <View style={styles.contentView}>
          <View style={styles.iconView}>
            <Icon name={Constant.iconWords[rowData.iconId || 0]} size={Constant.size.topBarImg} color={Constant.colors.iconColor} />
          </View>
          <View style={styles.itemLeft}>
            <Text numberOfLines={1} style={styles.itemLeftText}>{rowData.title}</Text>
            <Text style={styles.smallText}>{rowData.time}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text numberOfLines={1} style={styles.smallText}>{this.words[showType][0]}</Text>
            <Text style={styles.itemLeftText}>{this.words[showType][1]}</Text>
          </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

Item.propTypes = {
  rowData: React.PropTypes.object.isRequired,
  onPress: React.PropTypes.func.isRequired,
  showType: React.PropTypes.number.isRequired
};
