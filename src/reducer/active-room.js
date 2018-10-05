import Immutable from 'immutable';

var defaultState = Immutable.fromJS({roomId:null});
export default function activeRoom(state=defaultState,action){
    switch (action.type) {
        case 'SET_ACTIVE_ROOM':
            return state.set('roomId',action.data);
        default:
            return state;
    }
}