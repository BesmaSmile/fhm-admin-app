import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { client } from './client.reducer';
import { catalog } from './catalog.reducer';

const rootReducer = combineReducers({
  auth,
  client,
  catalog
});

export default rootReducer;