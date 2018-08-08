import * as ActionTypes from '../actions';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null,
  data: null,
};

function loginUserSuccess(state, action) {
  const { user } = action;

  return {
    ...state,
    loading: false,
    isLoggedIn: true,
    user,
  };
}

function loginUserFailure(state) {
  return {
    ...state,
    loading: false,
  };
}

function logoutUserSuccess(state) {
  return {
    ...state,
    loading: false,
    isLoggedIn: false,
    user: null,
  };
}

function logoutUserFailure(state) {
  return {
    ...state,
    loading: false,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER.SUCCESS:
      return loginUserSuccess(state, action);

    case ActionTypes.LOGIN_USER.FAILURE:
      return loginUserFailure(state);

    case ActionTypes.LOGOUT_USER.SUCCESS:
      return logoutUserSuccess(state);

    case ActionTypes.LOGOUT_USER.FAILURE:
      return logoutUserFailure(state);

    default:
      return state;
  }
};

export default reducer;
