import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Constant from '../../constant';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import DataHelper from '../../data/helper';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';

const bindThing = [
  'renderItem',
  'renderHiddenItem',
  'deleteRow',
  'changeShowType',
  'onEditItem'
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.makeEventArray(props.events),
      showType: 1,
    };
    bindThing.forEach(it => {
      this[it] = this[it].bind(this);
    });
    console.log(this.state.dataSource);
  }

  componentWillReceiveProps(nextProps) {
    // if (JSON.stringify(nextProps.events) != JSON.stringify(this.props.events)) {
      this.setState({
        dataSource: this.makeEventArray(nextProps.events)
      });
    // }
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
    let word = ['已过', rowData.diffDays, '天'];
    if (this.state.showType === 2) {
      word[0] = `到${rowData.baseYear}周年还需要`;
      word[1] = rowData.baseDiff;
    } else if (this.state.showType === 3) {
      word[0] = `到第${rowData.newYearPer}个10年还需要`;
      word[1] = rowData.newDiff;
    }
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
        <Button
          activeOpacity={0.8}
          onPress={_ => alert('xxx')}
        >
            <Text style={styles.itemLeftText}>{rowData.title}</Text>
        </Button>
      </View>

        <View style={styles.itemRight}>
        <Button
          activeOpacity={0.8}
          onPress={this.changeShowType}
        >
          <Text style={styles.itemRightText}>
            {word[0]}
            <Text style={styles.itemLeftText}>{word[1]}</Text>
            {word[2]}
          </Text>
      </Button>
        </View>
      </View>
    );
  }

  deleteRow(secId, rowId, rowMap, rowData) {
		rowMap[`${secId}${rowId}`].closeRow();
		// const newData = [...this.state.dataSource];
		// newData.splice(rowId, 1);
		// this.setState({dataSource: newData});
    const dispatch = this.props.dispatch;
    const [nd, de] = Events.deleteData(this.props.events.ids[rowId]);
    DataHelper.saveDatas(nd)((e,d) => {
      dispatch(ReduxActions.eventInitDatas(Events.getCurrentDatas()));
      DataHelper.deleteOne(de)(_ => {});
    });
	}

  onEditItem(secId, rowId, rowMap, rowData) {
    const rowKey = this.props.events.ids[rowId];
    rowMap[`${secId}${rowId}`].closeRow();
    Actions.add({rowKey, rowData})
  }

  renderHiddenItem(rowData, secId, rowId, rowMap) {
    return (
      <View style={styles.itemHidden}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLeftText}>{rowData.title}</Text>
        </View>
        <Button
          activeOpacity={0.8}
          containerStyle={styles.editButton}
          // style={styles.itemRightText}
          onPress={_ => this.onEditItem(secId, rowId, rowMap, rowData)}>
          Edit
        </Button>
        <Button
          activeOpacity={0.8}
          containerStyle={styles.deleteButton}
          // style={styles.itemRightText}
          onPress={_ => Alert.alert('Are you sure?', '删除将不可恢复，确定要删除'+rowData.title+'?', [
            {text: 'NNNNNO!', onPress: () => console.log('xxx')},
            {text: 'Yes', onPress: () => this.deleteRow(secId, rowId, rowMap, rowData)}
          ])}>
          Delete
        </Button>
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
//           leftOpenValue={75}
          rightOpenValue={-150}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 80,
    backgroundColor: Constant.colors.background,
  },
  item: {
    flex: 1,
    height: 80,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Constant.colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Constant.colors.line,
  },
  itemHidden: {
    flex: 1,
    height: 80,
    // padding: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemLeft: {
    flex: 2
  },
  itemLeftText: {
    fontSize: 20,
    color: Constant.colors.word
  },
  itemRightText: {
    fontSize: 10
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  editButton: {
    width: 70,
    padding: 5,
    height: 80,
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  deleteButton: {
    width: 80,
    padding: 5,
    height: 80,
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});

export default connect(state => ({events: state.events}))(Home);
