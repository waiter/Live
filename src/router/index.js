import React from 'react';
import {Image, StyleSheet, StatusBar} from 'react-native';
import {Scene, Router, Reducer, ActionConst, Actions} from 'react-native-router-flux';
import Home from '../scene/Home';
import Loading from '../scene/Loading';
import Edit from '../scene/Edit';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../redux/reducers';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../constant';

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

const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
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
              title="Days"
              type={ActionConst.REPLACE}
            />
            <Scene key="add" component={Edit} hideNavBar={false} title="Add"/>
            <Scene key="edit" component={Edit} hideNavBar={false} title="Edit"/>
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
    borderWidth: 1,
    borderColor: '#fff',
  }
});

export default RouterComponent;
