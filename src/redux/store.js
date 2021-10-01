import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';

const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

export default store;
