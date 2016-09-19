import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveReducer from './reducer-active';

const allReducers = combineReducers({
   users : UserReducer,
   active: ActiveReducer
});

export default allReducers;
