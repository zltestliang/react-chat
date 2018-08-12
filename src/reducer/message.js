import Immutable from 'immutable';



var defaultState = Immutable.fromJS({});

export default function msgList(state=defaultState, action){
    switch (action.type) {
        case 'PUSH_MESSAGE': 
            var roomMessage = state.get(action.data.roomId) || Immutable.fromJS([]);
            roomMessage = roomMessage.push(Immutable.fromJS(action.data));

            return state.set(action.data.roomId,roomMessage);
        case 'INIT_MESSAGE':
            
            return Immutable.fromJS(action.data);
        case 'PULL_MESSAGE':
            var Messages = state.get(action.data.roomId) || Immutable.fromJS([]);
            var history = Immutable.fromJS(action.data.history);

            Messages = Messages.concat(history);

            return state.set(action.data.roomId,Messages);;
        default:
            return state;

    }
}