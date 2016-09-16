import React from 'react';
import {Scene, Router, Reducer, ActionConst, Actions} from 'react-native-router-flux';
import Home from '../scene/Home';
import Loading from '../scene/Loading';
import Edit from '../scene/Edit';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../redux/reducers';
import Drawer from '../components/Drawer';

const getSceneStyle = function (props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: '#fff'
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 60;
  }
  return style;
};

const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

class RouterComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router getSceneStyle={getSceneStyle}>
          <Scene key="root">
            <Scene key="loading" component={Loading} hideNavBar title="Loading" initial={true}/>

              <Scene key="home" component={Home} hideNavBar={false} title="Login"
                type={ActionConst.REPLACE}
                rightTitle="add"
                onRight={_ => Actions.add()}
                leftTitle="menu"
                onLeft={_ => Actions.refresh({key: 'drawer', open: value => !value })}
              />
            
            <Scene key="add" component={Edit} hideNavBar={false} title="Add"
              backTitle="cancel"
              rightTitle="done"
              onRight={p => console.log(p.component)}
            />
            <Scene key="edit" component={Edit} hideNavBar={false} title="Edit"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default RouterComponent;
