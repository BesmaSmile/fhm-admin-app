import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { client } from './client.reducer';
import { catalog } from './catalog.reducer';
import { admin } from './admin.reducer';

const rootReducer = combineReducers({
  auth,
  client,
  catalog,
  admin
});

export default rootReducer;