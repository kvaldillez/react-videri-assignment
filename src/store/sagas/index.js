import { takeEvery, put, all, call } from 'redux-saga/effects';

import * as actions from '../actions';

function* checkUserStateSaga() {
  const userId = yield localStorage.getItem('userId');

  if (userId) {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );

    if (expirationDate <= new Date()) {
      yield put(actions.logoutUser.request());
    } else {
      yield put(actions.loginUser.request(userId));
    }
  } else {
    yield put(actions.logoutUser.request());
  }
}

function* watchCheckUserStateSaga() {
  yield takeEvery(actions.CHECK_USER_STATE.REQUEST, checkUserStateSaga);
}

function* loginUserSaga({ id }) {
  try {
    // Login will expire after one hour if you are inactive
    const expirationDate = yield new Date(
      new Date().getTime() + 60 * 60 * 1000
    );

    // Store for checking user status on app refresh
    yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
    yield call([localStorage, 'setItem'], 'userId', id);

    yield put(actions.loginUser.success({ id }));
  } catch (error) {
    yield put(actions.loginUser.failure(error));
  }
}

function* watchLoginUserSaga() {
  yield takeEvery(actions.LOGIN_USER.REQUEST, loginUserSaga);
}

function* logoutUserSaga() {
  try {
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutUser.success());
  } catch (error) {
    yield put(actions.logoutUser.failure(error));
  }
}

function* watchLogoutUserSaga() {
  yield takeEvery(actions.LOGOUT_USER.REQUEST, logoutUserSaga);
}

export default function* rootSaga() {
  yield all([
    watchCheckUserStateSaga(),
    watchLoginUserSaga(),
    watchLogoutUserSaga(),
  ]);
}
