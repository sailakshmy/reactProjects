import {combineReducers} from 'redux'; //Step-129
import userReducer from './userReducer';//Step-131
import chatReducer from './chatReducer';//Step-131

const rootReducer = combineReducers({//Step-132: Combining the reducers
    user:userReducer,
    chat:chatReducer
});

export default rootReducer;