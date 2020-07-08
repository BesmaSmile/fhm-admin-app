import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { client } from './client.reducer';

const rootReducer = combineReducers({
  auth,
  client
});

export default rootReducer;