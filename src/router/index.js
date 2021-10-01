import React from 'react';
import {Image, StyleSheet, StatusBar} from 'react-native';
import {Scene, Router, Reducer, ActionConst, Actions} from 'react-native-router-flux';
import Home from '../scene/Home';
import Loading from '../scene/Loading';
import Edit from '../scene/Edit';
import Show from '../scene/Show';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../constant';
import Language from '../Language';
import store from '../redux/store';

const getSceneStyle = function (props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: Constant.colors.background
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Constant.size.topBar;
  }
  return style;
};

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    Language.init();
    StatusBar.setBarStyle('light-content', 'fade');
  }

  render() {
    return (
      <Provider store={store}>
        <Router getSceneStyle={getSceneStyle}
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.titleStyle}
          rightButtonIconStyle={styles.rightButtonIconStyle}
          leftButtonIconStyle={styles.rightButtonIconStyle}
        >
          <Scene key="root">
            <Scene key="loading" component={Loading} hideNavBar title="Loading" initial={true}/>
            <Scene key="home" component={Home} hideNavBar={false}
              title={Language.datas.title}
              type={ActionConst.REPLACE}
              leftButtonStyle={styles.leftButtonStyle1}
            />
            <Scene key="add" component={Edit} hideNavBar={false} title={Language.datas.add}
              leftButtonStyle={styles.leftButtonStyle2}
            />
            <Scene key="show" component={Show} hideNavBar direction="vertical"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: Constant.colors.topBar,
    borderBottomWidth: 0,
    borderBottomColor: Constant.colors.topBar,
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold'
  },
  rightButtonIconStyle: {
    width: Constant.size.topBarImg,
    height: Constant.size.topBarImg,
  },
  leftButtonStyle1: {
    marginTop: 0,
  },
  leftButtonStyle2: {
    marginTop: 0,
    paddingTop: 4,
  }
});

export default RouterComponent;
