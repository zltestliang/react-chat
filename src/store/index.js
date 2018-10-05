import {createStore} from 'redux';
import rootReducer from '../reducer';
import Immutable from 'immutable';


var store = createStore(rootReducer);
export default store;