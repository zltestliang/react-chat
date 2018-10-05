import {combineReducers} from 'redux-immutable';
import roomList from './room-list';
import userInfo from './user-info';
import activeRoom from './active-room';
import message from './message';
import userSet from './user-set';

const rootReducer = combineReducers({
    roomList,
    userInfo,
    activeRoom,
    message,
    userSet
});

export default rootReducer