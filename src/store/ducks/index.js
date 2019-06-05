import { combineReducers } from 'redux';
import user from './user';
import categorias from './categorias';
import data from './data';
import patrimonios from './patrimonios';
import simulacao from './simulacao';

export default combineReducers({
  user,
  categorias,
  data,
  patrimonios,
  simulacao,
});
