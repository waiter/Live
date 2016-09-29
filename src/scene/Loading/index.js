import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Constant from '../../constant';
import DataHelper from '../../data/helper';
import ImageHelper from '../../data/image';
import { connect } from 'react-redux';
import Events from '../../data/events';
import ReduxActions from '../../redux/actions';
import {Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.colors.background,
  },
  text: {
    fontSize: 20,
    color: Constant.colors.iconColor,
    marginTop: 8,
  }
});

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  async init(dispatch) {
    dispatch(ReduxActions.startLoading());
    try {
      const data = await DataHelper.getAllDataAsync();
      // data.dataIsOpened = 0;
      console.log(data);
      const need = Events.initData(data);
      console.log(need);
      await DataHelper.saveDatasAsync(need);
      await ImageHelper._init();
      dispatch(ReduxActions.eventInitDatas(Events.getCurrentDatas()));
      dispatch(ReduxActions.startLoadingEnd());
      Actions.home();
    } catch (err) {
      dispatch(ReduxActions.startLoadingEnd({text: err.toString()}));
    }
  }

  componentWillMount() {
    const dispatch = this.props.dispatch;
    this.init(dispatch);
  }

  render() {
    return (
      <View style={styles.container}>
        <Progress.CircleSnail size={60} thickness={5} color={Constant.colors.iconColor} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}

export default connect(state => ({loading: state.loading.loading}))(Loading);
