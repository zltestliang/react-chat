import Immutable from 'immutable';

let defaultState = Immutable.fromJS({"list":Immutable.List(["read book"])});


export default function todos(state=defaultState,action){
    
    return state;
        switch (action.type) {
          
            default:
                return state;
            
        }
    }