import * as ActionTypes from '../actions';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null,
  folders: [
    { title: 'Clouds', url: 'clouds', media: 'photos', query: 'clouds' },
    { title: 'Cars', url: 'cars', media: 'photos', query: 'cars' },
    { title: 'Urban', url: 'urban', media: 'videos', query: 'urban' },
  ],
  media: {
    loading: false,
    content: [],
  },
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

function getMediaRequest(state) {
  return {
    ...state,
    media: {
      loading: true,
      ...state.media,
    },
  };
}

function getMediaSuccess(state, action) {
  const { data } = action;

  return {
    ...state,
    media: {
      loading: false,
      content: [...data.hits],
    },
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

    case ActionTypes.GET_MEDIA.REQUEST:
      return getMediaRequest(state);

    case ActionTypes.GET_MEDIA.SUCCESS:
      return getMediaSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
