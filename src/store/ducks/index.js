import { combineReducers } from 'redux';
import user from './user';
import categorias from './categorias';
import data from './data';
import patrimonios from './patrimonios';
import simulacao from './simulacao';
import v1 from './v1';
import v5 from './v5';
import a30d from './a30d';

export default combineReducers({
  user,
  categorias,
  data,
  patrimonios,
  simulacao,
  v1,
  v5,
  a30d,
});
