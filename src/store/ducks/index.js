import { combineReducers } from 'redux';
import user from './user';
import categorias from './categorias';
import data from './data';

export default combineReducers({
  user,
  categorias,
  data,
});
