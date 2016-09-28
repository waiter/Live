import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Alert,
  Image
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

const bindThing = [
  'renderItem',
  'renderHiddenItem',
  'deleteRow',
  'changeShowType',
  'onEditItem',
  'deleteData'
];

class Home extends BindComponent {
  constructor(props) {
    super(props, bindThing);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.makeEventArray(props.events),
      showType: 1,
    };
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
      onRight: () => Actions.add(),
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
      <Item rowData={rowData} showType={this.state.showType} onPress={_ => Actions.show()}/>
    );
  }

  async deleteData(rowId, dispatch) {
    try {
      const [nd, de] = Events.deleteData(this.props.events.ids[rowId]);
      await DataHelper.saveDatasAsync(nd);
      dispatch(ReduxActions.eventInitDatas(Events.getCurrentDatas()));
      await DataHelper.deleteOneAsync(de);
    } catch(e) {
      console.log(e);
    }
  }

  deleteRow(rowData, secId, rowId, rowMap) {
    Alert.alert('Are you sure?', '删除将不可恢复，确定要删除'+rowData.title+'?', [
      {text: 'NNNNNO!', onPress: null},
      {text: 'Yes', onPress: () => {
        rowMap[`${secId}${rowId}`].closeRow();
        const dispatch = this.props.dispatch;
        this.deleteData(rowId, dispatch);
      }}
    ]);
	}

  onEditItem(rowData, secId, rowId, rowMap) {
    const rowKey = this.props.events.ids[rowId];
    rowMap[`${secId}${rowId}`].closeRow();
    Actions.add({rowKey, rowData})
  }

  renderHiddenItem(rowData, secId, rowId, rowMap) {
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
    const backName = this.props.back || 'home';
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.dataSource)}
          renderRow={this.renderItem}
          renderHiddenRow={(rowData, secId, rowId, rowMap) => this.renderHiddenItem(rowData, secId, rowId, rowMap)}
          rightOpenValue={-Constant.size.itemHeight*2}
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
