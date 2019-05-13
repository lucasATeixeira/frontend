import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { authUser } from './user';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.LOGIN_REQUEST, authUser)]);
}
