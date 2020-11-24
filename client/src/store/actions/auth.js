import * as actionTypes from './actionTypes';
import Auth from '../../utils/Auth/auth';

export const register = (email, password) => (dispatch) => Auth.register(email, password).then(
  (response) => {
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
    });
    return Promise.resolve(response);
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      message,
    });
    return Promise.reject();
  },
);

export const login = (email, password) => (dispatch) => Auth.login(email, password).then(
  (data) => {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      userData: { user: data },
    });

    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      message,
    });
    return Promise.reject();
  },
);

export const logout = () => (dispatch) => {
  Auth.logout();

  dispatch({
    type: actionTypes.LOGOUT,
  });

  dispatch({
    type: actionTypes.GET_PLAYER_STATISTICS,
    statistics: null,
  });
};

export const cleareMessage = () => ({
  type: actionTypes.CLEAR_MESSAGE,
});
