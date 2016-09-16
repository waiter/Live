import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Constant from '../../constant';
import DataHelper from '../../data/helper';
import { connect } from 'react-redux';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.colors.background
  }
});

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const dispatch = this.props.dispatch;
    dispatch(ReduxActions.startLoading());
    // DataHelper.clearData()(_ => {});
    DataHelper.getAllData()((err, data) => {
      if (!err) {
        console.log(data);
        // data.dataIsOpened = 0;
        const need = Events.initData(data);
        console.log(need);
        DataHelper.saveDatas(need)((e,d) => {
          dispatch(ReduxActions.startLoadingEnd(e));
          dispatch(ReduxActions.eventInitDatas(Events.getCurrentDatas()));
          Actions.home();
          // Actions.refresh({key: 'drawer'});
        });
      } else {
        dispatch(ReduxActions.startLoadingEnd(err));
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.loading?'载入中...':'载入成功'}</Text>
      </View>
    );
  }
}

export default connect(state => ({loading: state.loading.loading}))(Loading);
