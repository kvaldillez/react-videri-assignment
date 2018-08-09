import {
  REQUEST,
  SUCCESS,
  FAILURE,
  createRequestTypes,
  action,
} from '../../utilities';

export const CHECK_USER_STATE = createRequestTypes('CHECK_USER_STATE');
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const LOGOUT_USER = createRequestTypes('LOGOUT_USER');
export const GET_MEDIA = createRequestTypes('GET_MEDIA');

export const checkUserState = {
  request: () => action(CHECK_USER_STATE[REQUEST]),
  success: user => action(CHECK_USER_STATE[SUCCESS], { user }),
  failure: error => action(CHECK_USER_STATE[FAILURE], { error }),
};

export const loginUser = {
  request: id => action(LOGIN_USER[REQUEST], { id }),
  success: user => action(LOGIN_USER[SUCCESS], { user }),
  failure: error => action(LOGIN_USER[FAILURE], { error }),
};

export const logoutUser = {
  request: () => action(LOGOUT_USER[REQUEST]),
  success: () => action(LOGOUT_USER[SUCCESS]),
  failure: error => action(LOGOUT_USER[FAILURE], { error }),
};

export const getMedia = {
  request: (media, query) => action(GET_MEDIA[REQUEST], { media, query }),
  success: data => action(GET_MEDIA[SUCCESS], { data }),
  failure: error => action(GET_MEDIA[FAILURE], { error }),
};
