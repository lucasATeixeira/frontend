/* eslint-disable no-throw-literal */
import { call, put } from 'redux-saga/effects';
import { Creators as UserActions } from '../ducks/user';
import api from '../../services/api';

export function* authUser(action) {
  const { email, senha } = action.payload;
  try {
    const { data } = yield call(api.post, 'api/session', { email, senha });
    const { token, user } = data;
    if (user.payment_status !== 'paid') {
      throw { response: { data: { error: 'Estamos processando seu pagamento' } } };
    }
    if (user.userType !== 'cliente') {
      throw {
        response: { data: { error: 'Acesso de administrador' } },
      };
    }
    localStorage.setItem('@Ondazul: user', JSON.stringify(user));
    localStorage.setItem('@Ondazul: token', token);
    yield put(UserActions.loginSuccess(user, token));
  } catch (err) {
    yield put(UserActions.loginFailure(err.response.data.error));
  }
}
