import * as actionTypes from './actionTypes';
import Auth from "../../utils/Auth/auth";

export const register = (username, email, password) => (dispatch) => {
  return Auth.register(username, email, password).then(
    (response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
      return Promise.resolve(response);
    },
    (error) => {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        message: error,
      });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return Auth.login(username, password).then(
    (data) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        userData: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        message: error,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: actionTypes.LOGOUT,
  });
};