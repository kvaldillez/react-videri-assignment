import { takeEvery, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

const fetchPhotosByType = query =>
  axios.get(
    `https://pixabay.com/api/?key=${
      process.env.REACT_APP_PIXABAY_API_KEY
    }&safesearch=true&per_page=50${query}`
  );

const fetchVideosByType = query =>
  axios.get(
    `https://pixabay.com/api/videos/?key=${
      process.env.REACT_APP_PIXABAY_API_KEY
    }&safesearch=true&per_page=50${query}`
  );

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

function* getMediaSaga({ media, query }) {
  let q = '';
  if (query) {
    q = `&q=${encodeURIComponent(query)}`;
  }
  try {
    if (media === 'photos') {
      const response = yield call(fetchPhotosByType, q);
      yield put(actions.getMedia.success(response.data));
    } else if (media === 'videos') {
      const response = yield call(fetchVideosByType, q);
      yield put(actions.getMedia.success(response.data));
    }
  } catch (error) {
    yield put(actions.getMedia.failure(error));
  }
}

function* watchGetMediaSaga() {
  yield takeEvery(actions.GET_MEDIA.REQUEST, getMediaSaga);
}

export default function* rootSaga() {
  yield all([
    watchCheckUserStateSaga(),
    watchLoginUserSaga(),
    watchLogoutUserSaga(),
    watchGetMediaSaga(),
  ]);
}
