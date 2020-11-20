import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { client } from './client.reducer';
import { catalog } from './catalog.reducer';
import { admin } from './admin.reducer';
import { news } from './news.reducer';

const rootReducer = combineReducers({
  auth,
  client,
  catalog,
  admin,
  news
});

export default rootReducer;