import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Alert,
  Image,
  DeviceEventEmitter
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Constant from '../../constant';
import { connect } from 'react-redux';
import DataHelper from '../../data/helper';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';
import ImageHelper from '../../data/image';
import BindComponent from '../../components/BindComponent';
import Item from '../../components/Item';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Language from '../../Language';
import { AdMobBanner} from 'react-native-admob';
import ADManager from '../../data/adManager';

const bindThing = [
  'renderItem',
  'renderHiddenItem',
  'deleteRow',
  'changeShowType',
  'onEditItem',
  'deleteData',
  'resetEvents',
  'addTimer',
  'resumeCheck',
  'onClickItem'
];

class Home extends BindComponent {
  constructor(props) {
    super(props, bindThing);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.makeEventArray(props.events),
      showType: 1,
    };
    this.timer = null;
    this.addTimer();
    DeviceEventEmitter.addListener("deviceResume", this.resumeCheck);
    // ADManager.checkReady();
  }

  resetEvents() {
    const dispatch = this.props.dispatch;
    Events.resetDatas();
    dispatch(ReduxActions.eventRestData());
    // another day
    this.addTimer();
  }

  addTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const needTime = (moment().endOf('day').unix() - moment().unix() + 2) * 1000;
    this.timer = setTimeout(this.resetEvents, needTime);
  }

  resumeCheck() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    ADManager.checkReady(true);
    const isSameDay = moment().isSame(Events.dataResetTime, 'day');
    if (!isSameDay) {
      this.resetEvents();
    }
    this.addTimer();
  }

  componentWillReceiveProps(nextProps) {
    // if (JSON.stringify(nextProps.events) != JSON.stringify(this.props.events)) {
      this.setState({
        dataSource: this.makeEventArray(nextProps.events)
      });
    // }
  }

  componentWillMount () {
    Actions.refresh({
      rightButtonImage: ImageHelper.add,
      onRight: () => {ADManager.checkReady();Actions.add();},
      leftButtonImage: ImageHelper.swap,
      onLeft: this.changeShowType
    })
  }

  makeEventArray(events) {
    return events.ids.map(id => events.datas[id]);
  }

  changeShowType() {
    this.setState({
      showType: this.state.showType % 3 + 1
    })
  }

  renderItem(rowData) {
    return (
      <Item rowData={rowData} showType={this.state.showType} onPress={_ => this.onClickItem(rowData)}/>
    );
  }

  onClickItem(rowData) {
    if (rowData.isAd) {
      const dispatch = this.props.dispatch;
      ADManager.isReady = false;
      dispatch(ReduxActions.eventRestData());
      ADManager.showAd();
    } else {
      Actions.show({rowData});
    }
  }

  async deleteData(rowId, dispatch) {
    try {
      const [nd, de] = Events.deleteData(this.props.events.ids[rowId]);
      await DataHelper.saveDatasAsync(nd);
      dispatch(ReduxActions.eventRestData());
      await DataHelper.deleteOneAsync(de);
    } catch(e) {
      console.log(e);
    }
  }

  deleteRow(rowData, secId, rowId, rowMap) {
    ADManager.checkReady();
    Alert.alert(Language.datas.sure, Language.datas.sureContent, [
      {text: Language.datas.no, onPress: null},
      {text: Language.datas.yes, onPress: () => {
        rowMap[`${secId}${rowId}`].closeRow();
        const dispatch = this.props.dispatch;
        this.deleteData(rowId, dispatch);
      }}
    ]);
	}

  onEditItem(rowData, secId, rowId, rowMap) {
    const rowKey = this.props.events.ids[rowId];
    rowMap[`${secId}${rowId}`].closeRow();
    ADManager.checkReady();
    Actions.add({rowKey, rowData})
  }

  renderHiddenItem(rowData, secId, rowId, rowMap) {
    if (rowData.isAd) {
      return null;
    }
    return (
      <View style={styles.itemHidden}>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.9}
          onPress={_ => this.onEditItem(rowData, secId, rowId, rowMap)}>
          <Icon name="create" size={Constant.size.topBarImg} color={Constant.colors.topBarImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.9}
          onPress={_ => this.deleteRow(rowData, secId, rowId, rowMap)}>
          <Icon name="delete-forever" size={Constant.size.topBarImg} color={Constant.colors.topBarImg} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.dataSource)}
          renderRow={this.renderItem}
          renderHiddenRow={(rowData, secId, rowId, rowMap) => this.renderHiddenItem(rowData, secId, rowId, rowMap)}
          rightOpenValue={-Constant.size.itemHeight*2}
          />
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          testDeviceID={ADManager.testDeviceID}
          adUnitID={ADManager.keys.home}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemHidden: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
    backgroundColor: Constant.colors.item,
  },
  editButton: {
    width: Constant.size.itemHeight,
    height: Constant.size.itemHeight - 1,
    backgroundColor: Constant.colors.edit,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButton: {
    width: Constant.size.itemHeight,
    height: Constant.size.itemHeight - 1,
    backgroundColor: Constant.colors.delete,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default connect(state => ({events: state.events}))(Home);
